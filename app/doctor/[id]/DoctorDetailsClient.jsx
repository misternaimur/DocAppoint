/** @format */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faClock,
  faCircleCheck,
  faLocationDot,
  faStar,
  faStethoscope,
  faHospital,
  faUserDoctor,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const reviews = [
  {
    name: "Michael Chen",
    time: "Reviewed 2 weeks ago",
    text: "Dr. Rahman is incredible. She took the time to explain my condition clearly and I never felt rushed.",
  },
  {
    name: "Nusrat Jahan",
    time: "Reviewed 1 month ago",
    text: "Very caring and professional. The appointment was smooth and the treatment plan was easy to follow.",
  },
];

export default function DoctorDetailsClient({ doctor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(
    doctor.availability[0] || "",
  );

  const doctorInitials = useMemo(() => {
    return doctor.name
      .split(" ")
      .filter((part) => part !== "Dr.")
      .slice(0, 2)
      .map((part) => part[0])
      .join("");
  }, [doctor.name]);

  return (
    <main className="min-h-screen bg-background text-on-surface">
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/Doctors"
              className="hover:text-primary transition-colors"
            >
              All Doctors
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold">{doctor.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
            <aside className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.10)]">
                <div className="relative aspect-[1/1.08] bg-linear-to-br from-emerald-500 to-teal-500 p-6 text-white">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                      {doctor.specialty}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                      <FontAwesomeIcon icon={faCircleCheck} />
                      Verified
                    </span>
                  </div>

                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/25 bg-white/15 text-2xl font-bold shadow-lg">
                    {doctorInitials}
                  </div>

                  <div className="mt-8">
                    <h1 className="text-3xl font-bold">{doctor.name}</h1>
                    <p className="mt-2 text-white/90">{doctor.specialty}</p>
                  </div>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/15 p-4 backdrop-blur">
                    <FontAwesomeIcon icon={faStar} className="text-amber-300" />
                    <div>
                      <p className="text-sm font-semibold">
                        {doctor.rating} / 5.0
                      </p>
                      <p className="text-xs text-white/80">
                        {doctor.reviews} patient reviews
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
                    <span>{doctor.experience} of experience</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-4">
                    <span className="text-sm font-medium text-slate-600">
                      Consultation Fee
                    </span>
                    <span className="text-2xl font-bold text-emerald-700">
                      ৳{doctor.fee}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full rounded-2xl bg-primary px-5 py-4 font-semibold text-on-primary shadow-lg transition hover:opacity-95"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Location</h2>
                <div className="mt-4 rounded-3xl bg-linear-to-br from-slate-100 to-emerald-50 p-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-emerald-600"
                    />
                    <div>
                      <p className="font-semibold">{doctor.location}</p>
                      <p className="text-sm text-slate-500">
                        Available for in-person consultation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">
                  About Doctor
                </h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
                  {doctor.description}
                </p>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Availability Slots
                  </h2>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    Book Today
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {doctor.availability.map((slot) => {
                    const active = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-2xl border px-5 py-4 text-left transition ${active ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon icon={faClock} />
                          <span className="font-semibold">{slot}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Please arrive 15 minutes before your selected slot.
                </p>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Patient Reviews
                  </h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    See All
                  </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  Book Appointment
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {doctor.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Choose a slot and continue to confirm your appointment.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close booking modal"
              >
                <FontAwesomeIcon icon={faCircleXmark} className="text-2xl" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {doctor.availability.map((slot) => {
                const active = selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${active ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">{slot}</span>
                      {active ? <FontAwesomeIcon icon={faCircleCheck} /> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href="/register"
                className="flex-1 rounded-2xl bg-primary px-5 py-4 text-center font-semibold text-on-primary transition hover:opacity-95"
              >
                Confirm Booking
              </Link>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
