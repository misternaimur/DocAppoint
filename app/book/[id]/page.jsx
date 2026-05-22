/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import BookingPageClient from "./BookingPageClient";
import { notFound } from "next/navigation";
import { createPageMetadata } from "../../seo";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);
  const doctorName = doctor?.name || "Doctor";
  const doctorSpecialty = doctor?.specialty || "Specialist";

  return createPageMetadata({
    title: `Book Appointment with ${doctorName}`,
    description: `Schedule an appointment with ${doctorName}, a ${doctorSpecialty}, through DocAppoint.`,
    path: `/book/${resolvedParams?.id || ""}`,
  });
}

export default async function BookingPage({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);

  if (!doctor) {
    notFound();
  }

  return <BookingPageClient doctor={doctor} />;
}
