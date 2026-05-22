/** @format */

"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faHospital,
  faLocationDot,
  faStethoscope,
  faStar,
  faUserDoctor,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const reviews = [
  {
    name: "Michael Chen",
    time: "Reviewed 2 weeks ago",
    text: "Took time to explain the condition clearly and made the visit feel calm and organized.",
  },
  {
    name: "Nusrat Jahan",
    time: "Reviewed 1 month ago",
    text: "Professional, caring, and very patient-focused. The treatment plan was easy to follow.",
  },
];

export default function DoctorDetailsClient({ doctor }) {
  const availableSlots = doctor.availability || [];
  const primarySlot = availableSlots[0] || "To be scheduled";
  const doctorInitials = doctor.name
    .split(" ")
    .filter((part) => part.toLowerCase() !== "dr.")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_34%),linear-gradient(180deg,#f8fffc_0%,#ffffff_55%,#f4f8fb_100%)] text-slate-900">
      <section className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-emerald-600">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/Doctors"
              className="transition-colors hover:text-emerald-600"
            >
              All Doctors
            </Link>
            <span>/</span>
            <span className="font-semibold text-emerald-700">
              {doctor.name}
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_24px_80px_rgba(16,185,129,0.10)]">
                <div className="relative bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                      {doctor.badge || doctor.specialty}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                      <FontAwesomeIcon icon={faCircleCheck} />
                      Verified
                    </span>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-24 w-24 rounded-[1.5rem] border border-white/25 object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-white/25 bg-white/15 text-2xl font-bold shadow-lg">
                        {doctorInitials}
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-white/85">Doctor profile</p>
                      <h1 className="mt-1 text-3xl font-bold leading-tight">
                        {doctor.name}
                      </h1>
                      <p className="mt-2 text-white/90">{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                        Experience
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        {doctor.experience}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                        Consultation Fee
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        ৳{doctor.fee}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FontAwesomeIcon
                      icon={faHospital}
                      className="text-emerald-600"
                    />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-emerald-600"
                    />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FontAwesomeIcon
                      icon={faStethoscope}
                      className="text-emerald-600"
                    />
                    <span>{doctor.mode || "In-person consultation"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-4">
                    <span className="text-sm font-medium text-slate-600">
                      Patient rating
                    </span>
                    <span className="inline-flex items-center gap-2 text-2xl font-bold text-emerald-700">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-amber-400"
                      />
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href={`/book/${doctor.id}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-4 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                    >
                      Book Appointment
                    </Link>
                    <a
                      href="tel:+880000000000"
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Contact Clinic
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Quick Facts
                </h2>
                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Specialty</span>
                    <strong className="text-slate-900">
                      {doctor.specialty}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Mode</span>
                    <strong className="text-slate-900">
                      {doctor.mode || "In-person"}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Availability</span>
                    <strong className="text-slate-900">{primarySlot}</strong>
                  </div>
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="grid gap-6 rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <FontAwesomeIcon icon={faUserDoctor} />
                    Doctor Overview
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-slate-900">
                    Trusted care with a patient-first approach
                  </h2>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
                    {doctor.description}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Experience
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {doctor.experience}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Reviews
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {doctor.reviews} patients
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Fee
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        ৳{doctor.fee}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-linear-to-br from-slate-900 to-slate-700 p-6 text-white">
                  <div className="flex items-center gap-3 text-white/85">
                    <FontAwesomeIcon icon={faClock} />
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                      Availability
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {availableSlots.map((slot) => (
                      <div
                        key={slot}
                        className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4"
                      >
                        <span className="font-medium">{slot}</span>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-emerald-300"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-7 text-white/80">
                    Arrive 15 minutes early so the clinic can complete your
                    check-in before the selected time slot.
                  </p>

                  <Link
                    href={`/book/${doctor.id}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 font-semibold text-slate-900 transition hover:bg-emerald-50"
                  >
                    Book Appointment Now
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Patient Reviews
                  </h2>
                  <span className="text-sm font-semibold text-emerald-700">
                    4.9 average
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {reviews.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-3xl bg-slate-50 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {review.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {review.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
