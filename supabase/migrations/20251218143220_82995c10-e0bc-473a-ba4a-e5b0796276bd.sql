-- Create achievements table
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL DEFAULT 'primary',
  criteria_type text NOT NULL, -- 'first_assessment', 'score_threshold', 'assessment_count', 'career_paths'
  criteria_value integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_achievements junction table
CREATE TABLE public.user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Achievements are readable by everyone
CREATE POLICY "Achievements are publicly readable"
ON public.achievements FOR SELECT
USING (true);

-- Users can view their own achievements
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own achievements (earned via app logic)
CREATE POLICY "Users can earn achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Seed initial achievements
INSERT INTO public.achievements (name, description, icon, color, criteria_type, criteria_value) VALUES
('First Steps', 'Complete your first assessment', 'Award', 'yellow', 'first_assessment', 1),
('Rising Star', 'Score above 70% on an assessment', 'Star', 'blue', 'score_threshold', 70),
('High Achiever', 'Score above 85% on an assessment', 'Trophy', 'purple', 'score_threshold', 85),
('Perfectionist', 'Score 95% or above on an assessment', 'Crown', 'yellow', 'score_threshold', 95),
('Explorer', 'Complete assessments in 3 different career paths', 'Compass', 'green', 'career_paths', 3),
('Dedicated Learner', 'Complete 5 assessments', 'BookOpen', 'blue', 'assessment_count', 5),
('Assessment Master', 'Complete 10 assessments', 'GraduationCap', 'purple', 'assessment_count', 10),
('Skill Champion', 'Complete 25 assessments', 'Medal', 'yellow', 'assessment_count', 25);