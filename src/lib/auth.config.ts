import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Prisma, no bcrypt, no Node-only APIs.
// This is what middleware imports so it can run on the Edge runtime.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [], // Actual providers (Credentials + Prisma) are added in auth.ts
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: "USER" | "ADMIN" }).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
};