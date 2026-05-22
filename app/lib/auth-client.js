/** @format */
import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const defaultAuthBaseURL =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth`
    : "https://doc-appoint-eight.vercel.app/api/auth";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || defaultAuthBaseURL,
  plugins: [
    jwtClient
  ]
});

export const { useSession, signOut, signIn } = authClient;
