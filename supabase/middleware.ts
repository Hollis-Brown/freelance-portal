import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    // Check if Supabase environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables are missing in middleware");
      return response;
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    // protected routes
    if (request.nextUrl.pathname.startsWith("/dashboard") && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && !error && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch (e) {
    console.error("Error in middleware:", e);
    // If you are here, a Supabase client could not be created!
    return response;
  }
};
