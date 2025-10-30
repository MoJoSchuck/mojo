import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Recommended matcher by Clerk for Next.js App Router
export const config = {
  matcher: [
    // Run middleware on all routes except for static files and public assets
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
