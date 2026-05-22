/** @format */

export const doctors = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "10 years",
    mode: "In-person & Online",
    badge: "Top Rated",
    initials: "AR",
    accent: "from-emerald-500 to-teal-500",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description:
      "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.9,
    reviews: 124,
    verified: true,
  },
  {
    id: "d2",
    name: "Dr. Sarah Johnson",
    specialty: "Neurologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "8 years",
    mode: "Video Consultation",
    badge: "Available",
    initials: "SJ",
    accent: "from-sky-500 to-cyan-500",
    availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
    description:
      "Dedicated neurologist focused on diagnosis, treatment, and long-term management of brain and nerve disorders.",
    hospital: "City Neurology Center",
    location: "Gulshan, Dhaka",
    fee: 1000,
    rating: 4.8,
    reviews: 98,
    verified: true,
  },
  {
    id: "d3",
    name: "Dr. Emily Watson",
    specialty: "Dermatologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "6 years",
    mode: "In-person & Online",
    badge: "Popular",
    initials: "EW",
    accent: "from-rose-500 to-pink-500",
    availability: ["11:00 AM - 02:00 PM", "06:00 PM - 09:00 PM"],
    description:
      "Skin care specialist providing diagnosis and treatment for acne, eczema, allergy, and cosmetic concerns.",
    hospital: "Skin Care Clinic",
    location: "Banani, Dhaka",
    fee: 700,
    rating: 4.7,
    reviews: 86,
    verified: true,
  },
  {
    id: "d4",
    name: "Dr. David Miller",
    specialty: "Orthopedic",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "12 years",
    mode: "In-person",
    badge: "Verified",
    initials: "DM",
    accent: "from-amber-500 to-orange-500",
    availability: ["09:30 AM - 12:30 PM", "03:30 PM - 06:30 PM"],
    description:
      "Orthopedic expert treating bone, joint, and muscle related conditions with advanced care and guidance.",
    hospital: "Advanced Orthopedic Hospital",
    location: "Uttara, Dhaka",
    fee: 900,
    rating: 4.9,
    reviews: 132,
    verified: true,
  },
];

const candidateUrls = [
  process.env.NEXT_PUBLIC_DOCTORS_API_URL,
  "http://localhost:5000/doctors",
  "http://localhost:8080/doctors",
].filter(Boolean);

function getInitials(name = "Doctor") {
  return name
    .split(" ")
    .filter((part) => part.toLowerCase() !== "dr.")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function normalizeDoctor(doctor, index) {
  const normalizedId = String(
    doctor?.id ?? doctor?._id ?? `doctor-${index + 1}`,
  );

  // Normalize image field to a simple string URL with a sensible fallback.
  const rawImage = doctor?.image;
  let imageUrl = null;

  if (typeof rawImage === "string" && rawImage.trim() !== "") {
    imageUrl = rawImage;
  } else if (rawImage && typeof rawImage === "object") {
    imageUrl = rawImage.url || rawImage.src || null;
  }

  if (!imageUrl) {
    imageUrl = "/Asset/DocAppoint.png"; // public fallback
  }

  return {
    ...doctor,
    id: normalizedId,
    image: imageUrl,
    initials: doctor?.initials || getInitials(doctor?.name),
    availability: Array.isArray(doctor?.availability)
      ? doctor.availability
      : [],
  };
}

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

async function getDoctorsFromRemote() {
  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        continue;
      }

      const remoteDoctors = await extractDoctors(response);

      if (Array.isArray(remoteDoctors) && remoteDoctors.length > 0) {
        return remoteDoctors.map(normalizeDoctor);
      }
    } catch (error) {
      console.error(`Failed to load doctors from ${url}:`, error);
    }
  }

  return null;
}

export async function getDoctorById(id) {
  const remoteDoctors = await getDoctorsFromRemote();

  if (Array.isArray(remoteDoctors)) {
    const remoteDoctor = remoteDoctors.find(
      (doctor) => String(doctor.id) === String(id),
    );

    if (remoteDoctor) {
      return remoteDoctor;
    }
  }

  return doctors.find((doctor) => String(doctor.id) === String(id));
}
