-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  PRIMARY KEY (candidate_id, job_id)
);

-- Add RLS policies for saved_jobs table
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Candidates can insert their own saved jobs
CREATE POLICY "Candidates can insert their own saved jobs" ON public.saved_jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can delete their own saved jobs
CREATE POLICY "Candidates can delete their own saved jobs" ON public.saved_jobs
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can view their own saved jobs
CREATE POLICY "Candidates can view their own saved jobs" ON public.saved_jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Create indexes for saved_jobs searches
CREATE INDEX idx_saved_jobs_candidate_id ON public.saved_jobs(candidate_id);
CREATE INDEX idx_saved_jobs_job_id ON public.saved_jobs(job_id);
CREATE INDEX idx_saved_jobs_saved_at ON public.saved_jobs(saved_at);
