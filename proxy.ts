import { withAuth } from "next-auth/middleware";

const authProxy = withAuth({
  pages: {
    signIn: "/auth",
  },
});

// Next.js 16 `proxy.ts` requires a default or named `proxy` function export.
export const proxy = authProxy;
export default authProxy;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico$|auth|blueprints|$).*)',
  ],
};
