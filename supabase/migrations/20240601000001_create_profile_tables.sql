-- Create employer_profiles table
CREATE TABLE IF NOT EXISTS employer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  founded_year INTEGER,
  headquarters TEXT NOT NULL,
  has_remote_positions TEXT,
  website TEXT,
  linkedin TEXT,
  hiring_roles TEXT NOT NULL,
  hiring_frequency TEXT NOT NULL,
  company_description TEXT NOT NULL,
  is_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create candidate_profiles table
CREATE TABLE IF NOT EXISTS candidate_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  professional_title TEXT NOT NULL,
  phone TEXT,
  availability TEXT NOT NULL,
  location TEXT NOT NULL,
  remote_preference TEXT,
  relocation TEXT,
  highest_education TEXT NOT NULL,
  institution TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL,
  current_company TEXT,
  current_position TEXT,
  skills TEXT[] NOT NULL,
  professional_summary TEXT NOT NULL,
  is_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for employer_profiles
DROP POLICY IF EXISTS "Users can view their own employer profile" ON employer_profiles;
CREATE POLICY "Users can view their own employer profile"
  ON employer_profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own employer profile" ON employer_profiles;
CREATE POLICY "Users can update their own employer profile"
  ON employer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own employer profile" ON employer_profiles;
CREATE POLICY "Users can insert their own employer profile"
  ON employer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for candidate_profiles
DROP POLICY IF EXISTS "Users can view their own candidate profile" ON candidate_profiles;
CREATE POLICY "Users can view their own candidate profile"
  ON candidate_profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own candidate profile" ON candidate_profiles;
CREATE POLICY "Users can update their own candidate profile"
  ON candidate_profiles FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own candidate profile" ON candidate_profiles;
CREATE POLICY "Users can insert their own candidate profile"
  ON candidate_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable public viewing of candidate profiles for employers
DROP POLICY IF EXISTS "Employers can view all candidate profiles" ON candidate_profiles;
CREATE POLICY "Employers can view all candidate profiles"
  ON candidate_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM employer_profiles
    WHERE employer_profiles.user_id = auth.uid()
  ));
