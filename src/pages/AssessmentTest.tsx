import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Brain, AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { cn } from '@/lib/utils';

export default function AssessmentTestPage() {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    currentDifficulty,
    answers,
    submitAnswer,
    nextQuestion,
    completeAssessment,
  } = useAssessmentStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAnswer();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(currentQuestion?.timeLimit || 60);
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  const handleSubmitAnswer = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const answer = {
      questionId: currentQuestion.id,
      selectedOption: selectedOption ?? -1,
      timeSpent: (currentQuestion.timeLimit || 60) - timeLeft,
      isCorrect: selectedOption === currentQuestion.correctAnswer,
    };

    submitAnswer(answer);

    setTimeout(() => {
      if (isLastQuestion) {
        completeAssessment();
        navigate('/results');
      } else {
        nextQuestion();
        setIsSubmitting(false);
      }
    }, 500);
  }, [selectedOption, currentQuestion, timeLeft, isLastQuestion]);

  const getDifficultyColor = () => {
    switch (currentDifficulty) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-destructive bg-destructive/10';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-display font-bold">SkillForge Pro</span>
            </div>
            <div className={cn("px-3 py-1 rounded-full text-xs font-medium", getDifficultyColor())}>
              {currentDifficulty.toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Question <strong className="text-foreground">{currentQuestionIndex + 1}</strong> of {questions.length}
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold",
              timeLeft <= 10 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-muted"
            )}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {currentQuestion.category}
                </span>
              </div>

              {/* Question */}
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-10">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4",
                      selectedOption === index
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0",
                      selectedOption === index
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base">{option}</span>
                  </motion.button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null || isSubmitting}
                  className="min-w-[200px]"
                >
                  {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Help Text */}
              <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  Questions adapt based on your performance. Stay focused and answer to the best of your ability.
                  Time runs out automatically if you don't submit.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
