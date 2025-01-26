import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from 'next-auth/providers/github';
import { prisma } from '@repo/database';
declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}
const nextAuthUrl = process.env.NEXTAUTH_URL!;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {},
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: 'lax',
        domain: '.localhost.com',
        secure: false,
      },
    },
  },
});
