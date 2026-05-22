/** @format */

import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Authentication",
  description: "Sign in or create an account to manage your appointments.",
  path: "/login",
  noindex: true,
});

export default function AuthLayout({ children }) {
  return <>{children}</>;
}
