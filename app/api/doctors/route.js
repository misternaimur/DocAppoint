/** @format */

import { NextResponse } from "next/server";
import { doctors as fallbackDoctors } from "../../Doctors/doctorData";

const candidateUrls = [
  process.env.NEXT_PUBLIC_DOCTORS_API_URL,
  "http://localhost:5000/doctors",
  "http://localhost:8080/doctors",
].filter(Boolean);

async function extractDoctors(response) {
  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.doctors)) {
    return data.doctors;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return null;
}

export async function GET() {
  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        continue;
      }

      const doctors = await extractDoctors(response);

      if (Array.isArray(doctors) && doctors.length > 0) {
        return NextResponse.json(doctors);
      }
    } catch (error) {
      console.error(`Failed to load doctors from ${url}:`, error);
    }
  }

  return NextResponse.json(fallbackDoctors);
}
