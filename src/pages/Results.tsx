import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trophy,
  Download,
  Share2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Award,
  Zap,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useAuth } from '@/hooks/useAuth';
import { saveAssessmentResult, getUserAssessmentResults } from '@/services/assessmentService';
import { checkAndAwardAchievements, Achievement } from '@/services/achievementsService';
import { toast } from 'sonner';
import { ShareResultModal } from '@/components/results/ShareResultModal';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { result, userName, selectedCareerPath, resetAssessment } = useAssessmentStore();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Demo data if no result
  const demoResult = result || {
    totalScore: 78,
    categoryScores: {
      'Logical Reasoning': 85,
      'Technical Knowledge': 72,
      'Personality': 88,
      'Aptitude': 75,
      'Subject Knowledge': 70,
    },
    strengths: ['Logical Reasoning', 'Personality'],
    weaknesses: ['Subject Knowledge', 'Technical Knowledge'],
    recommendations: [
      'Complete the Advanced Problem Solving course',
      'Practice more logical reasoning exercises',
      'Take the specialized technical assessment',
    ],
    careerFit: {
      'Software Engineering': 88,
      'Data Science': 82,
      'Product Management': 76,
      'Digital Marketing': 68,
      'UI/UX Design': 74,
    },
    completedAt: new Date(),
  };

  // Save result to database when user is logged in
  useEffect(() => {
    const saveResult = async () => {
      if (user && result && !hasSaved) {
        setIsSaving(true);
        try {
          await saveAssessmentResult({
            user_id: user.id,
            career_path: selectedCareerPath || 'general',
            total_score: result.totalScore,
            category_scores: result.categoryScores,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            career_fit: result.careerFit,
          });
          setHasSaved(true);
          toast.success('Your results have been saved!');

          // Check and award achievements
          const allResults = await getUserAssessmentResults(user.id);
          const uniqueCareerPaths = new Set(allResults.map(r => r.career_path)).size;
          
          const earned = await checkAndAwardAchievements(
            user.id,
            result.totalScore,
            allResults.length,
            uniqueCareerPaths
          );
          
          if (earned.length > 0) {
            setNewAchievements(earned);
            earned.forEach(achievement => {
              toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`, {
                description: achievement.description,
                duration: 5000,
              });
            });
          }
        } catch (error) {
          console.error('Failed to save result:', error);
          toast.error('Failed to save results. Please try again.');
        } finally {
          setIsSaving(false);
        }
      }
    };

    saveResult();
  }, [user, result, hasSaved, selectedCareerPath]);

  const radarData = Object.entries(demoResult.categoryScores).map(([name, value]) => ({
    category: name,
    score: value,
    fullMark: 100,
  }));

  const sortedCareerFit = Object.entries(demoResult.careerFit)
    .sort(([, a], [, b]) => b - a);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-600';
    if (score >= 60) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const handleTakeAnother = () => {
    resetAssessment();
    navigate('/assessment');
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-6">
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Assessment Complete!</span>
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Congratulations, <span className="text-gradient">{userName || user?.email?.split('@')[0] || 'User'}!</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's your personalized skill assessment report with career recommendations and next steps.
            </p>
            {!user && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
                <Zap className="w-4 h-4" />
                <Link to="/signup" className="font-medium hover:underline">
                  Sign up to save your results
                </Link>
              </div>
            )}
          </motion.div>

          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative bg-card rounded-3xl border border-border p-8 shadow-xl overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(demoResult.totalScore)} opacity-5`} />

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                {/* Score Circle */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="url(#scoreGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 553' }}
                        animate={{ strokeDasharray: `${(demoResult.totalScore / 100) * 553} 553` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className={`font-display text-5xl font-bold ${getScoreColor(demoResult.totalScore)}`}
                      >
                        {demoResult.totalScore}
                      </motion.span>
                      <span className="text-muted-foreground text-sm">out of 100</span>
                    </div>
                  </div>
                  <p className="mt-4 text-lg font-medium">Overall Score</p>
                </div>

                {/* Top Career Match */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Career Match</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                        <Award className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-display text-2xl font-bold">{sortedCareerFit[0][0]}</p>
                        <p className="text-success font-medium">{sortedCareerFit[0][1]}% match</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="hero" className="flex-1" asChild>
                      <Link to="/certificate">
                        <Download className="w-4 h-4" />
                        Get Certificate
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setShowShareModal(true)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Share Modal */}
          <ShareResultModal
            open={showShareModal}
            onOpenChange={setShowShareModal}
            userName={userName || user?.email?.split('@')[0] || 'User'}
            totalScore={demoResult.totalScore}
            topCareer={sortedCareerFit[0][0]}
            topCareerScore={sortedCareerFit[0][1]}
            strengths={demoResult.strengths}
            completedAt={demoResult.completedAt instanceof Date ? demoResult.completedAt : new Date()}
          />

          {/* Detailed Results Grid */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display text-xl font-bold mb-6">Skill Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Career Fit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display text-xl font-bold mb-6">Career Fit Analysis</h3>
              <div className="space-y-4">
                {sortedCareerFit.map(([career, score], index) => (
                  <div key={career}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{career}</span>
                      <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(score)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-display text-xl font-bold">Your Strengths</h3>
              </div>
              <div className="space-y-3">
                {demoResult.strengths.map((strength) => (
                  <div
                    key={strength}
                    className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Areas to Improve */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-display text-xl font-bold">Areas to Improve</h3>
              </div>
              <div className="space-y-3">
                {demoResult.weaknesses.map((weakness) => (
                  <div
                    key={weakness}
                    className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20"
                  >
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span className="font-medium">{weakness}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold">Recommended Next Steps</h3>
              </div>
              <div className="space-y-4">
                {demoResult.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{rec}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild className="flex-1">
                  <Link to="/certificate">
                    <Award className="w-5 h-5" />
                    Get Your Certificate
                  </Link>
                </Button>
                <Button variant="outline-primary" size="lg" onClick={handleTakeAnother} className="flex-1">
                  Take Another Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
