export const doctors = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "10 years",
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

export function getDoctorById(id) {
  return doctors.find((doctor) => doctor.id === id) || doctors[0];
}
