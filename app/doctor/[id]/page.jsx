/** @format */

import { getDoctorById } from "../../Doctors/doctorData";
import DoctorDetailsClient from "./DoctorDetailsClient";
import { notFound } from "next/navigation";
import { createDoctorMetadata } from "../../seo";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);

  if (!doctor) {
    return createDoctorMetadata(null, `/doctor/${resolvedParams?.id || ""}`);
  }

  return createDoctorMetadata(doctor, `/doctor/${resolvedParams.id}`);
}

export default async function DoctorDetailsPage({ params }) {
  const resolvedParams = await params;
  const doctor = await getDoctorById(resolvedParams?.id);

  if (!doctor) {
    notFound();
  }

  return <DoctorDetailsClient doctor={doctor} />;
}
