-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'applied',
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  notes TEXT
);

-- Add RLS policies for applications table
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policy: Candidates can only insert their own applications
CREATE POLICY "Candidates can insert their own applications" ON public.applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can only update their own applications
CREATE POLICY "Candidates can update their own applications" ON public.applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Candidates can view their own applications
CREATE POLICY "Candidates can view their own applications" ON public.applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id
  ));

-- Policy: Employers can view applications for their jobs
CREATE POLICY "Employers can view applications for their jobs" ON public.applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    WHERE j.id = job_id
  ));

-- Policy: Employers can update applications for their jobs
CREATE POLICY "Employers can update applications for their jobs" ON public.applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    WHERE j.id = job_id
  ));

-- Create indexes for application searches
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_candidate_id ON public.applications(candidate_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_applied_at ON public.applications(applied_at);

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
