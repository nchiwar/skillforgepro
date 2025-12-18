import { create } from 'zustand';

export type UserGoal = 'student' | 'job-seeker' | 'professional' | null;
export type CareerPath = string | null;

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeLimit: number; // seconds
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  timeSpent: number;
  isCorrect: boolean;
}

export interface AssessmentResult {
  totalScore: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerFit: Record<string, number>;
  completedAt: Date;
}

interface AssessmentState {
  // User info
  userGoal: UserGoal;
  selectedCareerPath: CareerPath;
  userName: string;
  
  // Assessment state
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
  isAssessmentActive: boolean;
  isAssessmentComplete: boolean;
  currentDifficulty: 'easy' | 'medium' | 'hard';
  
  // Results
  result: AssessmentResult | null;
  
  // Actions
  setUserGoal: (goal: UserGoal) => void;
  setCareerPath: (path: CareerPath) => void;
  setUserName: (name: string) => void;
  startAssessment: () => void;
  submitAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

// Sample questions for demo
const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'A train travels 120 km in 2 hours. What is its average speed?',
    options: ['40 km/h', '60 km/h', '80 km/h', '100 km/h'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Logical Reasoning',
    timeLimit: 60,
  },
  {
    id: '2',
    text: 'Which programming paradigm emphasizes immutability and pure functions?',
    options: ['Object-Oriented', 'Procedural', 'Functional', 'Imperative'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'Technical Knowledge',
    timeLimit: 45,
  },
  {
    id: '3',
    text: 'In a team meeting, a colleague\'s idea is criticized. How do you respond?',
    options: [
      'Stay silent to avoid conflict',
      'Defend the idea if you believe in it',
      'Change the subject',
      'Agree with the criticism to maintain harmony'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Personality',
    timeLimit: 30,
  },
  {
    id: '4',
    text: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Aptitude',
    timeLimit: 90,
  },
  {
    id: '5',
    text: 'Which Nigerian university is best known for its medical program?',
    options: ['University of Lagos', 'University of Ibadan', 'Ahmadu Bello University', 'Obafemi Awolowo University'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Subject Knowledge',
    timeLimit: 30,
  },
];

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  userGoal: null,
  selectedCareerPath: null,
  userName: '',
  currentQuestionIndex: 0,
  questions: sampleQuestions,
  answers: [],
  isAssessmentActive: false,
  isAssessmentComplete: false,
  currentDifficulty: 'easy',
  result: null,

  setUserGoal: (goal) => set({ userGoal: goal }),
  setCareerPath: (path) => set({ selectedCareerPath: path }),
  setUserName: (name) => set({ userName: name }),

  startAssessment: () => set({
    isAssessmentActive: true,
    currentQuestionIndex: 0,
    answers: [],
    isAssessmentComplete: false,
  }),

  submitAnswer: (answer) => {
    const { answers, currentDifficulty } = get();
    const newAnswers = [...answers, answer];
    
    // Adaptive difficulty logic
    const recentAnswers = newAnswers.slice(-3);
    const correctCount = recentAnswers.filter(a => a.isCorrect).length;
    
    let newDifficulty = currentDifficulty;
    if (correctCount >= 3 && currentDifficulty !== 'hard') {
      newDifficulty = currentDifficulty === 'easy' ? 'medium' : 'hard';
    } else if (correctCount === 0 && currentDifficulty !== 'easy') {
      newDifficulty = currentDifficulty === 'hard' ? 'medium' : 'easy';
    }
    
    set({ answers: newAnswers, currentDifficulty: newDifficulty });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  completeAssessment: () => {
    const { answers, questions } = get();
    
    // Calculate scores
    const totalScore = Math.round((answers.filter(a => a.isCorrect).length / questions.length) * 100);
    
    // Category scores
    const categoryScores: Record<string, number> = {};
    const categories = [...new Set(questions.map(q => q.category))];
    
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const categoryAnswers = answers.filter(a => {
        const q = questions.find(q => q.id === a.questionId);
        return q?.category === category;
      });
      const correct = categoryAnswers.filter(a => a.isCorrect).length;
      categoryScores[category] = Math.round((correct / categoryQuestions.length) * 100);
    });
    
    // Determine strengths and weaknesses
    const sortedCategories = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
    const strengths = sortedCategories.slice(0, 2).map(([cat]) => cat);
    const weaknesses = sortedCategories.slice(-2).map(([cat]) => cat);
    
    // Career fit calculation (demo)
    const careerFit: Record<string, number> = {
      'Software Engineering': Math.min(100, totalScore + 10),
      'Data Science': Math.min(100, totalScore + 5),
      'Product Management': Math.min(100, totalScore - 5),
      'Digital Marketing': Math.min(100, totalScore - 10),
      'UI/UX Design': Math.min(100, totalScore),
    };
    
    const result: AssessmentResult = {
      totalScore,
      categoryScores,
      strengths,
      weaknesses,
      recommendations: [
        'Complete the Advanced Problem Solving course',
        'Practice more logical reasoning exercises',
        'Take the specialized technical assessment',
      ],
      careerFit,
      completedAt: new Date(),
    };
    
    set({ isAssessmentComplete: true, isAssessmentActive: false, result });
  },

  resetAssessment: () => set({
    userGoal: null,
    selectedCareerPath: null,
    userName: '',
    currentQuestionIndex: 0,
    answers: [],
    isAssessmentActive: false,
    isAssessmentComplete: false,
    currentDifficulty: 'easy',
    result: null,
  }),
}));
