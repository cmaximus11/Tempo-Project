-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies for skills table
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view skills
CREATE POLICY "Everyone can view skills" ON public.skills
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only admins can insert/update/delete skills
CREATE POLICY "Only admins can insert skills" ON public.skills
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM public.users WHERE user_metadata->>'role' = 'admin'
  ));

CREATE POLICY "Only admins can update skills" ON public.skills
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM public.users WHERE user_metadata->>'role' = 'admin'
  ));

CREATE POLICY "Only admins can delete skills" ON public.skills
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM public.users WHERE user_metadata->>'role' = 'admin'
  ));

-- Create index for skill searches
CREATE INDEX idx_skills_name ON public.skills(name);
CREATE INDEX idx_skills_category ON public.skills(category);
