-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_id UUID NOT NULL REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  job_type TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities JSONB,
  requirements JSONB,
  benefits JSONB,
  is_remote BOOLEAN NOT NULL DEFAULT false,
  experience_level TEXT,
  skills_required JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies for jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Employers can only insert their own jobs
CREATE POLICY "Employers can insert their own jobs" ON public.jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.employer_profiles WHERE id = company_id
  ));

-- Policy: Employers can only update their own jobs
CREATE POLICY "Employers can update their own jobs" ON public.jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.employer_profiles WHERE id = company_id
  ));

-- Policy: Employers can only delete their own jobs
CREATE POLICY "Employers can delete their own jobs" ON public.jobs
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.employer_profiles WHERE id = company_id
  ));

-- Policy: Everyone can view active jobs
CREATE POLICY "Everyone can view active jobs" ON public.jobs
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policy: Employers can view all their own jobs (active and inactive)
CREATE POLICY "Employers can view all their own jobs" ON public.jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.employer_profiles WHERE id = company_id
  ));

-- Create index for job searches
CREATE INDEX idx_jobs_title ON public.jobs USING gin(to_tsvector('english', title));
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
