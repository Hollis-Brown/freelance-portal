-- Add a public insert policy to allow new user registration without authentication
DROP POLICY IF EXISTS "Public insert access" ON users;

CREATE POLICY "Public insert access"
ON users FOR INSERT
WITH CHECK (true);

-- Enable realtime for users table if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'users'
  ) THEN
    alter publication supabase_realtime add table users;
  END IF;
END$$;
