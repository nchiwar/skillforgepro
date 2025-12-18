-- Create a secure function to get leaderboard data (anonymized)
CREATE OR REPLACE FUNCTION public.get_leaderboard(limit_count INT DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  display_name TEXT,
  avatar_url TEXT,
  total_assessments BIGINT,
  best_score INT,
  average_score INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY MAX(ar.total_score) DESC) as rank,
    COALESCE(p.full_name, 'Anonymous') as display_name,
    p.avatar_url,
    COUNT(ar.id) as total_assessments,
    MAX(ar.total_score)::INT as best_score,
    ROUND(AVG(ar.total_score))::INT as average_score
  FROM assessment_results ar
  LEFT JOIN profiles p ON ar.user_id = p.user_id
  GROUP BY ar.user_id, p.full_name, p.avatar_url
  ORDER BY best_score DESC
  LIMIT limit_count;
END;
$$;