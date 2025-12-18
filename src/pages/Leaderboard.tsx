import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Zap,
  Crown,
  Flame,
  User,
  Loader2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { AchievementBadge } from '@/components/achievements/AchievementBadge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getAllAchievements, getUserAchievements, Achievement, UserAchievement } from '@/services/achievementsService';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  display_name: string;
  avatar_url: string | null;
  total_assessments: number;
  best_score: number;
  average_score: number;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardData, achievementsData] = await Promise.all([
          supabase.rpc('get_leaderboard', { limit_count: 20 }),
          getAllAchievements(),
        ]);
        
        if (leaderboardData.error) throw leaderboardData.error;
        setLeaderboard(leaderboardData.data || []);
        setAllAchievements(achievementsData);

        // Fetch user achievements if logged in
        if (user) {
          const userAchievementsData = await getUserAchievements(user.id);
          setUserAchievements(userAchievementsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievement_id));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-warning" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Medal className="w-6 h-6 text-accent" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-warning/10 border-warning/30';
      case 2:
        return 'bg-muted/50 border-muted-foreground/30';
      case 3:
        return 'bg-accent/10 border-accent/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Top <span className="text-gradient">Performers</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how you stack up against other learners. Complete assessments to climb the ranks!
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-3xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-display text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Top Scorers
                  </h2>
                </div>

                {loading ? (
                  <div className="p-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading leaderboard...</p>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">No scores yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Be the first to complete an assessment and claim the top spot!
                    </p>
                    <Button variant="hero" asChild>
                      <Link to="/assessment">
                        <Zap className="w-4 h-4" />
                        Take Assessment
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {leaderboard.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className={cn(
                          "p-4 flex items-center gap-4 transition-colors hover:bg-muted/50",
                          getRankStyle(entry.rank)
                        )}
                      >
                        {/* Rank */}
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                          {getRankIcon(entry.rank)}
                        </div>

                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                          {entry.avatar_url ? (
                            <img
                              src={entry.avatar_url}
                              alt={entry.display_name}
                              className="w-full h-full rounded-xl object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-primary-foreground" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold truncate">
                            {entry.display_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.total_assessments} assessment{entry.total_assessments !== 1 ? 's' : ''}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="text-right">
                          <div className="font-display text-2xl font-bold text-primary">
                            {entry.best_score}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Avg: {entry.average_score}%
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Achievements Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-3xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-display text-xl font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    Achievement Badges
                  </h2>
                </div>

                <div className="p-4 space-y-3">
                  {allAchievements.map((achievement, index) => {
                    const userAchievement = userAchievements.find(
                      (ua) => ua.achievement_id === achievement.id
                    );
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <AchievementBadge
                          name={achievement.name}
                          description={achievement.description}
                          icon={achievement.icon}
                          color={achievement.color}
                          unlocked={earnedAchievementIds.has(achievement.id)}
                          earnedAt={userAchievement?.earned_at}
                          size="md"
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Complete assessments to unlock more badges!
                  </p>
                </div>
              </div>

              {/* Streak Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl border border-accent/30 p-6 text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4 shadow-glow-accent">
                  <Flame className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-1">
                  🔥 3 Day Streak
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Keep it going! Take an assessment today to maintain your streak.
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/assessment">
                    <Zap className="w-4 h-4" />
                    Continue Streak
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}