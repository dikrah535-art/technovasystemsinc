-- job_postings
CREATE TABLE public.job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  employment_type text NOT NULL,
  description text NOT NULL,
  is_active boolean NOT NULL DEFAULT true
);

GRANT SELECT ON public.job_postings TO anon, authenticated;
GRANT ALL ON public.job_postings TO service_role;

ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active job postings"
  ON public.job_postings FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- job_applications
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  role_applied_for text NOT NULL,
  resume_url text NOT NULL,
  job_posting_id uuid REFERENCES public.job_postings(id) ON DELETE SET NULL
);

GRANT INSERT ON public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a job application"
  ON public.job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Storage policy: anyone may upload to the resumes bucket
CREATE POLICY "Anyone can upload a resume"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');

-- Seed job postings
INSERT INTO public.job_postings (title, department, location, employment_type, description, is_active) VALUES
  ('Senior Cloud Engineer', 'Engineering', 'Remote · US', 'Full-time', 'Design and operate scalable AWS infrastructure for high-traffic platforms. 5+ years cloud experience required.', true),
  ('Data Platform Lead', 'Data', 'Austin, TX · Hybrid', 'Full-time', 'Lead our data platform strategy across ingestion, warehousing, and analytics. Snowflake / dbt expertise preferred.', true),
  ('Principal Security Engineer', 'Security', 'Remote · Global', 'Full-time', 'Own the security roadmap across cloud, identity, and product. CISSP/OSCP a plus.', true),
  ('Technical Recruiter', 'Talent', 'Remote · US', 'Full-time', 'Source and place top engineering talent for our enterprise clients. 3+ years tech recruiting required.', true);