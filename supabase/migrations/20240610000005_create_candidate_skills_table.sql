-- Create candidate_skills table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.candidate_skills (
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  years_experience INTEGER,
  proficiency_level TEXT,
  PRIMARY KEY (candidate_id, skill_id)
);

-- Add RLS policies for candidate_skills table
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;

-- Policy: Candidates can insert their own skills
CREATE POLICY "Candidates can insert their own skills" ON public.candidate_skills
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can update their own skills
CREATE POLICY "Candidates can update their own skills" ON public.candidate_skills
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can delete their own skills
CREATE POLICY "Candidates can delete their own skills" ON public.candidate_skills
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Everyone can view candidate skills
CREATE POLICY "Everyone can view candidate skills" ON public.candidate_skills
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for candidate_skills searches
CREATE INDEX idx_candidate_skills_candidate_id ON public.candidate_skills(candidate_id);
CREATE INDEX idx_candidate_skills_skill_id ON public.candidate_skills(skill_id);
