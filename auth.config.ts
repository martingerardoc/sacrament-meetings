import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtected =
        nextUrl.pathname === '/meetings/new' ||
        nextUrl.pathname.startsWith('/meetings/') &&
          nextUrl.pathname.endsWith('/edit');

      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;