/** @format */

import Register from "../../Compont/Auth-page/Register";
import { createPageMetadata } from "../../seo";

export const metadata = createPageMetadata({
  title: "Register",
  description:
    "Create your DocAppoint account to book appointments and track your visit history.",
  path: "/register",
  noindex: true,
});

export default function RegisterPage() {
  return <Register />;
}
