import { createServerClient } from "@supabase/ssr";

export const createClient = async (options?: { admin?: boolean }) => {
  // Use service role key if admin is true
  const supabaseKey = options?.admin
    ? process.env.SUPABASE_SERVICE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey,
    {
      // Use a version without cookies() for client components
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for client components
        },
      },
    },
  );
};
