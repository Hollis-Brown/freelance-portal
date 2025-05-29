-- Enable row level security for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;
DROP POLICY IF EXISTS "Auth users can insert their own data" ON users;

-- Create policies
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (auth.uid()::uuid = id);

CREATE POLICY "Service role can manage all users"
ON users FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Auth users can insert their own data"
ON users FOR INSERT
WITH CHECK (auth.uid()::uuid = id);

-- Enable realtime for users table
alter publication supabase_realtime add table users;