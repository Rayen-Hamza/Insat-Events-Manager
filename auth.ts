import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const GET = handlers.GET;
export const POST = handlers.POST;
export { auth, signIn, signOut };
