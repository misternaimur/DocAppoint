/** @format */

import Login from "../../Compont/Auth-page/Login";
import { createPageMetadata } from "../../seo";

export const metadata = createPageMetadata({
  title: "Login",
  description:
    "Sign in to DocAppoint to book appointments and manage your healthcare dashboard.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return <Login />;
}
