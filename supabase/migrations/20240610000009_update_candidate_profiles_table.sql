-- Update candidate_profiles table with additional fields
ALTER TABLE public.candidate_profiles
ADD COLUMN IF NOT EXISTS resume_url TEXT,
ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
ADD COLUMN IF NOT EXISTS preferred_job_types JSONB,
ADD COLUMN IF NOT EXISTS preferred_locations JSONB,
ADD COLUMN IF NOT EXISTS willing_to_relocate BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS availability_status TEXT,
ADD COLUMN IF NOT EXISTS desired_salary INTEGER;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_availability_status ON public.candidate_profiles(availability_status);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_willing_to_relocate ON public.candidate_profiles(willing_to_relocate);
