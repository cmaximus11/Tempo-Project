-- Update employer_profiles table with additional fields
ALTER TABLE public.employer_profiles
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS company_size TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS company_description TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS social_media_links JSONB;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_employer_profiles_company_size ON public.employer_profiles(company_size);
CREATE INDEX IF NOT EXISTS idx_employer_profiles_industry ON public.employer_profiles(industry);
