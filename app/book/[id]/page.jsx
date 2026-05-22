/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import BookingPageClient from "./BookingPageClient";
import { notFound } from "next/navigation";

export default function BookingPage({ params }) {
  const doctor = getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  return <BookingPageClient doctor={doctor} />;
}
