import { forwardRef } from 'react';
import { Trophy, Award, Zap, Star } from 'lucide-react';

interface ShareableResultCardProps {
  userName: string;
  totalScore: number;
  topCareer: string;
  topCareerScore: number;
  strengths: string[];
  completedAt: Date;
}

export const ShareableResultCard = forwardRef<HTMLDivElement, ShareableResultCardProps>(
  ({ userName, totalScore, topCareer, topCareerScore, strengths, completedAt }, ref) => {
    const getScoreColor = (score: number) => {
      if (score >= 80) return 'text-emerald-400';
      if (score >= 60) return 'text-amber-400';
      return 'text-rose-400';
    };

    return (
      <div
        ref={ref}
        className="w-[600px] h-[400px] relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 font-semibold text-lg">SkillForge Pro</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(totalScore / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex items-center gap-8 mt-4">
            {/* Score circle */}
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#cardGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(totalScore / 100) * 440} 440`}
                />
                <defs>
                  <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-bold text-4xl ${getScoreColor(totalScore)}`}>
                  {totalScore}
                </span>
                <span className="text-white/50 text-sm">Score</span>
              </div>
            </div>

            {/* User info */}
            <div className="flex-1">
              <p className="text-white/60 text-sm mb-1">Congratulations!</p>
              <h2 className="text-white text-2xl font-bold mb-4">{userName}</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Top Career Match</p>
                  <p className="text-white font-semibold">{topCareer}</p>
                  <p className="text-emerald-400 text-sm font-medium">{topCareerScore}% match</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="flex flex-wrap gap-2">
                {strengths.slice(0, 3).map((strength) => (
                  <span
                    key={strength}
                    className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white/60 text-sm">Skill Assessment Complete</span>
            </div>
            <span className="text-white/40 text-xs">
              {completedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ShareableResultCard.displayName = 'ShareableResultCard';
