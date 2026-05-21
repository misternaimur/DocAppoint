/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import BookingPageClient from "./BookingPageClient";

export default function BookingPage({ params }) {
  const doctor = getDoctorById(params.id);

  return <BookingPageClient doctor={doctor} />;
}
