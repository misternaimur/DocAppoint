/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import DoctorDetailsClient from "./DoctorDetailsClient";
import { notFound } from "next/navigation";

export default function DoctorDetailsPage({ params }) {
  const doctor = getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  return <DoctorDetailsClient doctor={doctor} />;
}
