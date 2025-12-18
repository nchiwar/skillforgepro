import { supabase } from '@/integrations/supabase/client';

export interface AssessmentResultData {
  user_id: string;
  career_path: string;
  total_score: number;
  category_scores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  career_fit: Record<string, number>;
  certificate_id?: string;
}

export async function saveAssessmentResult(data: AssessmentResultData) {
  const { data: result, error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: data.user_id,
      career_path: data.career_path,
      total_score: data.total_score,
      category_scores: data.category_scores,
      strengths: data.strengths,
      weaknesses: data.weaknesses,
      career_fit: data.career_fit,
      certificate_id: data.certificate_id || `SF-${Date.now().toString(36).toUpperCase()}`,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving assessment result:', error);
    throw error;
  }

  return result;
}

export async function getUserAssessmentResults(userId: string) {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching assessment results:', error);
    throw error;
  }

  return data;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }

  return data;
}

export async function updateUserProfile(userId: string, updates: {
  full_name?: string;
  goal?: string;
  avatar_url?: string;
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
}
