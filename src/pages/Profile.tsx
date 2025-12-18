import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  BarChart3,
  Trophy,
  Target,
  ArrowRight,
  Edit2,
  LogOut,
  Loader2,
  Zap,
  Flame
} from 'lucide-react';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import { AchievementBadge } from '@/components/achievements/AchievementBadge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, getUserAssessmentResults } from '@/services/assessmentService';
import { getAllAchievements, getUserAchievements, Achievement, UserAchievement } from '@/services/achievementsService';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  goal: string | null;
  created_at: string;
}

interface AssessmentResult {
  id: string;
  career_path: string;
  total_score: number;
  category_scores: Record<string, number> | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  career_fit: Record<string, number> | null;
  certificate_id: string | null;
  completed_at: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = (updates: { full_name?: string; avatar_url?: string; goal?: string }) => {
    if (profile) {
      setProfile({
        ...profile,
        full_name: updates.full_name ?? profile.full_name,
        avatar_url: updates.avatar_url ?? profile.avatar_url,
        goal: updates.goal ?? profile.goal,
      });
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const [profileData, resultsData, allAchievementsData, userAchievementsData] = await Promise.all([
          getUserProfile(user.id),
          getUserAssessmentResults(user.id),
          getAllAchievements(),
          getUserAchievements(user.id),
        ]);
        setProfile(profileData);
        setResults((resultsData || []) as unknown as AssessmentResult[]);
        setAllAchievements(allAchievementsData);
        setUserAchievements(userAchievementsData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievement_id));

  const stats = {
    totalAssessments: results.length,
    averageScore: results.length > 0 
      ? Math.round(results.reduce((sum, r) => sum + r.total_score, 0) / results.length)
      : 0,
    certificates: results.filter(r => r.certificate_id).length,
    bestScore: results.length > 0 
      ? Math.max(...results.map(r => r.total_score))
      : 0,
    achievementsEarned: userAchievements.length,
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const formatCareerPath = (path: string) => {
    return path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-card rounded-3xl border border-border p-8 relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 gradient-primary opacity-5" />

              <div className="relative flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || 'User'}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-primary-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-display text-3xl font-bold mb-2">
                    {profile?.full_name || user.email?.split('@')[0] || 'User'}
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(profile?.created_at || user.created_at || new Date().toISOString())}</span>
                    </div>
                  </div>
                  {profile?.goal && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <Target className="w-4 h-4" />
                        {profile.goal.charAt(0).toUpperCase() + profile.goal.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-primary">{stats.totalAssessments}</div>
              <div className="text-sm text-muted-foreground">Assessments</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="font-display text-3xl font-bold text-success">{stats.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div className="font-display text-3xl font-bold text-accent">{stats.certificates}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <Link 
              to="/leaderboard"
              className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <div className="font-display text-3xl font-bold text-warning">{stats.bestScore}%</div>
              <div className="text-sm text-muted-foreground">Best Score</div>
            </Link>
          </motion.div>

          {/* Achievements Section */}
          {allAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Achievements ({stats.achievementsEarned}/{allAchievements.length})
                </h2>
                <Link to="/leaderboard" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {allAchievements.slice(0, 8).map((achievement) => {
                  const userAchievement = userAchievements.find(
                    (ua) => ua.achievement_id === achievement.id
                  );
                  return (
                    <AchievementBadge
                      key={achievement.id}
                      name={achievement.name}
                      description={achievement.description}
                      icon={achievement.icon}
                      color={achievement.color}
                      unlocked={earnedAchievementIds.has(achievement.id)}
                      earnedAt={userAchievement?.earned_at}
                      size="sm"
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Streak & Leaderboard CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Link
              to="/leaderboard"
              className="block bg-gradient-to-r from-accent/20 via-primary/20 to-success/20 rounded-2xl border border-accent/30 p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-glow-accent">
                    <Flame className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">🔥 3 Day Streak</h3>
                    <p className="text-sm text-muted-foreground">
                      View the leaderboard and compete with other learners!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
                  View Leaderboard
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Assessment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Assessment History</h2>
              <Button variant="hero" asChild>
                <Link to="/assessment">
                  <Zap className="w-4 h-4" />
                  New Assessment
                </Link>
              </Button>
            </div>

            {results.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">No assessments yet</h3>
                <p className="text-muted-foreground mb-6">
                  Take your first assessment to discover your skills and get personalized career recommendations.
                </p>
                <Button variant="hero" asChild>
                  <Link to="/assessment">
                    Start Your First Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-bold",
                          result.total_score >= 80 ? "bg-success/10 text-success" :
                          result.total_score >= 60 ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        )}>
                          {result.total_score}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold">
                            {formatCareerPath(result.career_path)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Completed on {formatDate(result.completed_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Top Career Match */}
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Top Match</div>
                          <div className="font-medium text-primary">
                            {result.career_fit ? Object.entries(result.career_fit).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'N/A' : 'N/A'}
                          </div>
                        </div>

                        {/* Certificate Badge */}
                        {result.certificate_id && (
                          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                            <Award className="w-4 h-4" />
                            Certified
                          </div>
                        )}

                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/certificate?id=${result.certificate_id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Strengths */}
                    {result.strengths && result.strengths.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-muted-foreground">Strengths:</span>
                          {result.strengths.map((strength) => (
                            <span
                              key={strength}
                              className="px-2 py-0.5 rounded-md bg-success/10 text-success text-xs font-medium"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Edit Profile Modal */}
      {profile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={{
            user_id: profile.user_id,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            goal: profile.goal,
          }}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}
