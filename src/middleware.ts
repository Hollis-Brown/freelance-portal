import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "../supabase/middleware";

export async function middleware(req: NextRequest) {
  // Use the updateSession function from supabase/middleware.ts
  // which already has error handling for environment variables
  return updateSession(req);
}

// Ensure the middleware is only called for relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/payments/webhook (webhook endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/payments/webhook).*)",
  ],
};
