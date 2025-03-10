-- Create job_skills table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.job_skills (
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  importance INTEGER DEFAULT 1,
  PRIMARY KEY (job_id, skill_id)
);

-- Add RLS policies for job_skills table
ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;

-- Policy: Employers can insert job skills for their own jobs
CREATE POLICY "Employers can insert job skills for their own jobs" ON public.job_skills
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    WHERE j.id = job_id
  ));

-- Policy: Employers can update job skills for their own jobs
CREATE POLICY "Employers can update job skills for their own jobs" ON public.job_skills
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    WHERE j.id = job_id
  ));

-- Policy: Employers can delete job skills for their own jobs
CREATE POLICY "Employers can delete job skills for their own jobs" ON public.job_skills
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    WHERE j.id = job_id
  ));

-- Policy: Everyone can view job skills
CREATE POLICY "Everyone can view job skills" ON public.job_skills
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for job_skills searches
CREATE INDEX idx_job_skills_job_id ON public.job_skills(job_id);
CREATE INDEX idx_job_skills_skill_id ON public.job_skills(skill_id);
