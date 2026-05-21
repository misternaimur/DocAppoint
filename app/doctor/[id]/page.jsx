import { getDoctorById } from "../../Doctors/doctorData";
import DoctorDetailsClient from "./DoctorDetailsClient";

export default function DoctorDetailsPage({ params }) {
  const doctor = getDoctorById(params.id);

  return <DoctorDetailsClient doctor={doctor} />;
}
