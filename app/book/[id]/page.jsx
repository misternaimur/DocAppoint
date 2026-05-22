/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import BookingPageClient from "./BookingPageClient";
import { notFound } from "next/navigation";

export default async function BookingPage({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);

  if (!doctor) {
    notFound();
  }

  return <BookingPageClient doctor={doctor} />;
}
