import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  User,
  Mail
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAssessmentStore, UserGoal } from '@/stores/assessmentStore';
import { cn } from '@/lib/utils';

const goals = [
  {
    id: 'student' as UserGoal,
    title: 'Student',
    description: 'Choosing university/polytechnic courses (JAMB, UTME preparation)',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    features: ['Course recommendations', 'JAMB subject matcher', 'University fit score'],
  },
  {
    id: 'job-seeker' as UserGoal,
    title: 'Job Seeker',
    description: 'Preparing for specific job roles and interviews',
    icon: Briefcase,
    color: 'from-emerald-500 to-teal-600',
    features: ['Job role matching', 'Skill gap analysis', 'Interview preparation'],
  },
  {
    id: 'professional' as UserGoal,
    title: 'Professional',
    description: 'Validating skills for promotions, certifications, or freelance',
    icon: Rocket,
    color: 'from-amber-500 to-orange-600',
    features: ['Skill certification', 'Blockchain badges', 'Portfolio enhancement'],
  },
];

const careerPaths = [
  { id: 'software-engineering', name: 'Software Engineering', category: 'Tech' },
  { id: 'data-science', name: 'Data Science & Analytics', category: 'Tech' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Tech' },
  { id: 'product-management', name: 'Product Management', category: 'Business' },
  { id: 'digital-marketing', name: 'Digital Marketing', category: 'Business' },
  { id: 'ui-ux-design', name: 'UI/UX Design', category: 'Creative' },
  { id: 'medicine', name: 'Medicine', category: 'Healthcare' },
  { id: 'law', name: 'Law', category: 'Legal' },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { userGoal, setUserGoal, selectedCareerPath, setCareerPath, setUserName, startAssessment } = useAssessmentStore();

  const handleGoalSelect = (goal: UserGoal) => {
    setUserGoal(goal);
  };

  const handleCareerSelect = (careerPath: string) => {
    setCareerPath(careerPath);
  };

  const handleStartAssessment = () => {
    setUserName(name);
    startAssessment();
    navigate('/assessment/test');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return userGoal !== null;
      case 2:
        return selectedCareerPath !== null;
      case 3:
        return name.trim().length > 0 && email.includes('@');
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Step {step} of 3</span>
              <span className="text-sm font-medium text-primary">{Math.round((step / 3) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Goal Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    What brings you to <span className="text-gradient">SkillForge</span>?
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Select your primary goal to personalize your assessment experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {goals.map((goal) => (
                    <motion.button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative text-left p-6 rounded-2xl border-2 transition-all duration-300",
                        userGoal === goal.id
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      {userGoal === goal.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-5`}>
                        <goal.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="font-display text-xl font-bold mb-2">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                      
                      <ul className="space-y-2">
                        {goal.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Career Path Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Choose Your <span className="text-gradient">Assessment Path</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Select the career area you want to be assessed in
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {careerPaths.map((path) => (
                    <motion.button
                      key={path.id}
                      onClick={() => handleCareerSelect(path.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative text-left p-4 rounded-xl border-2 transition-all duration-300",
                        selectedCareerPath === path.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      {selectedCareerPath === path.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      
                      <span className="text-xs text-muted-foreground mb-1 block">{path.category}</span>
                      <h3 className="font-display font-semibold text-sm">{path.name}</h3>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: User Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto"
              >
                <div className="text-center mb-12">
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Almost <span className="text-gradient">Ready!</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Enter your details to save your progress and receive your certificate
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border bg-card focus:border-primary focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border bg-card focus:border-primary focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      Your data is encrypted and will only be used to generate your personalized certificate.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            )}

            {step < 3 ? (
              <Button
                variant="hero"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleStartAssessment}
                disabled={!canProceed()}
              >
                Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
