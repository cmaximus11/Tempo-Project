-- Create interviews table
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  interview_type TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies for interviews table
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Policy: Employers can insert interviews for their job applications
CREATE POLICY "Employers can insert interviews for their job applications" ON public.interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    JOIN public.applications a ON a.job_id = j.id
    WHERE a.id = application_id
  ));

-- Policy: Employers can update interviews for their job applications
CREATE POLICY "Employers can update interviews for their job applications" ON public.interviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    JOIN public.applications a ON a.job_id = j.id
    WHERE a.id = application_id
  ));

-- Policy: Employers can view interviews for their job applications
CREATE POLICY "Employers can view interviews for their job applications" ON public.interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ep.user_id FROM public.employer_profiles ep
    JOIN public.jobs j ON j.company_id = ep.id
    JOIN public.applications a ON a.job_id = j.id
    WHERE a.id = application_id
  ));

-- Policy: Candidates can view their own interviews
CREATE POLICY "Candidates can view their own interviews" ON public.interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT cp.user_id FROM public.candidate_profiles cp
    JOIN public.applications a ON a.candidate_id = cp.id
    WHERE a.id = application_id
  ));

-- Create indexes for interview searches
CREATE INDEX idx_interviews_application_id ON public.interviews(application_id);
CREATE INDEX idx_interviews_scheduled_at ON public.interviews(scheduled_at);
CREATE INDEX idx_interviews_status ON public.interviews(status);

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.interviews
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
