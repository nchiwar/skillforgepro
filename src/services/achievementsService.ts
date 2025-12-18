import { supabase } from '@/integrations/supabase/client';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria_type: string;
  criteria_value: number;
}

export interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
  achievement: Achievement;
}

export async function getAllAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('criteria_value', { ascending: true });

  if (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }

  return data || [];
}

export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      id,
      achievement_id,
      earned_at,
      achievements (
        id,
        name,
        description,
        icon,
        color,
        criteria_type,
        criteria_value
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user achievements:', error);
    throw error;
  }

  return (data || []).map(item => ({
    id: item.id,
    achievement_id: item.achievement_id,
    earned_at: item.earned_at,
    achievement: item.achievements as unknown as Achievement,
  }));
}

export async function checkAndAwardAchievements(
  userId: string,
  assessmentScore: number,
  totalAssessments: number,
  uniqueCareerPaths: number
): Promise<Achievement[]> {
  // Fetch all achievements and user's existing achievements
  const [allAchievements, userAchievements] = await Promise.all([
    getAllAchievements(),
    getUserAchievements(userId),
  ]);

  const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievement_id));
  const newlyEarnedAchievements: Achievement[] = [];

  for (const achievement of allAchievements) {
    // Skip if already earned
    if (earnedAchievementIds.has(achievement.id)) continue;

    let shouldAward = false;

    switch (achievement.criteria_type) {
      case 'first_assessment':
        shouldAward = totalAssessments >= 1;
        break;
      case 'score_threshold':
        shouldAward = assessmentScore >= achievement.criteria_value;
        break;
      case 'assessment_count':
        shouldAward = totalAssessments >= achievement.criteria_value;
        break;
      case 'career_paths':
        shouldAward = uniqueCareerPaths >= achievement.criteria_value;
        break;
    }

    if (shouldAward) {
      // Award the achievement
      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id,
        });

      if (!error) {
        newlyEarnedAchievements.push(achievement);
      }
    }
  }

  return newlyEarnedAchievements;
}
