import { motion } from 'framer-motion';
import {
  Award,
  Star,
  Trophy,
  Crown,
  Compass,
  BookOpen,
  GraduationCap,
  Medal,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  earnedAt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, LucideIcon> = {
  Award,
  Star,
  Trophy,
  Crown,
  Compass,
  BookOpen,
  GraduationCap,
  Medal,
};

const colorMap: Record<string, string> = {
  yellow: 'bg-warning/10 text-warning',
  blue: 'bg-primary/10 text-primary',
  purple: 'bg-accent/10 text-accent',
  green: 'bg-success/10 text-success',
  primary: 'bg-primary/10 text-primary',
};

export function AchievementBadge({
  name,
  description,
  icon,
  color,
  unlocked,
  earnedAt,
  size = 'md',
}: AchievementBadgeProps) {
  const Icon = iconMap[icon] || Award;
  const colorClass = colorMap[color] || colorMap.primary;

  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-10 h-10',
      iconSize: 'w-5 h-5',
      title: 'text-xs',
      desc: 'text-[10px]',
    },
    md: {
      container: 'p-4',
      icon: 'w-12 h-12',
      iconSize: 'w-6 h-6',
      title: 'text-sm',
      desc: 'text-xs',
    },
    lg: {
      container: 'p-5',
      icon: 'w-14 h-14',
      iconSize: 'w-7 h-7',
      title: 'text-base',
      desc: 'text-sm',
    },
  };

  const s = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'rounded-2xl border transition-all',
        s.container,
        unlocked
          ? 'bg-card border-border'
          : 'bg-muted/30 border-transparent opacity-50'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'rounded-xl flex items-center justify-center',
            s.icon,
            colorClass
          )}
        >
          <Icon className={s.iconSize} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-display font-bold', s.title)}>{name}</h4>
          <p className={cn('text-muted-foreground truncate', s.desc)}>
            {description}
          </p>
          {unlocked && earnedAt && (
            <p className={cn('text-muted-foreground mt-0.5', s.desc)}>
              Earned {new Date(earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        {unlocked && (
          <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
            <Star className="w-3 h-3 text-success" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
