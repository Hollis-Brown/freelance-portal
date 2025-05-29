import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerActionClient = async (options?: {
  admin?: boolean;
}) => {
  try {
    const cookieStore = cookies();

    // Check if environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    // Use service role key if admin is true
    const supabaseKey = options?.admin ? supabaseServiceKey : supabaseAnonKey;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      });
      throw new Error(
        "Your project's URL and Key are required to create a Supabase client!",
      );
    }

    return createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          try {
            return cookieStore.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          } catch (error) {
            // If cookies() is called in an environment where it's not allowed
            console.error("Error accessing cookies:", error);
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // If cookies() is called in an environment where it's not allowed
            console.error("Error setting cookies:", error);
          }
        },
      },
    });
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    throw error;
  }
};
