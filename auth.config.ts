import type { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { pages } from "next/dist/build/templates/app-page";

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "moetez@example.com",
        },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "Your name" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (dbUser) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          if ((bcrypt.compare(credentials.password, dbUser.password))) {

            const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
            return dbUserWithoutPassword as User;

          }

          return null;

        } else {
          throw new Error("User does not exist");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    // signOut: "/signout",
    newUser: "/signup",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
};

const nextAuth = NextAuth(authConfig);
export const { handlers, auth, signIn, signOut } = nextAuth;
