/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import DoctorDetailsClient from "./DoctorDetailsClient";
import { notFound } from "next/navigation";

export default async function DoctorDetailsPage({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);

  if (!doctor) {
    notFound();
  }

  return <DoctorDetailsClient doctor={doctor} />;
}
