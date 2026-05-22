/** @format */

import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Dashboard",
  description:
    "View, update, and manage your booked appointments from your DocAppoint dashboard.",
  path: "/dashboard",
  noindex: true,
});

export default function DashboardLayout({ children }) {
  return children;
}
