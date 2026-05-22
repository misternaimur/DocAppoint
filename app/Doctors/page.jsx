/** @format */

import AllDoctors from "./AllDoctors";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Find Doctors",
  description:
    "Browse verified doctors, compare specialties, and choose the right healthcare professional for your appointment.",
  path: "/Doctors",
});

export default function DoctorsPage() {
  return <AllDoctors />;
}
