/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faCalendarCheck,
  faClock,
  faHospital,
  faLocationDot,
  faStar,
  faUserDoctor,
  faCircleCheck,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

const reviews = [
  {
    name: "Michael Chen",
    time: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Very professional and attentive throughout the consultation.",
  },
  {
    name: "Nusrat Jahan",
    time: "1 month ago",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Clear explanation and excellent patient care experience.",
  },
];

export default function DoctorDetailsClient({ doctor }) {
  const availableSlots = doctor?.availability || [];

  const rating = doctor?.rating ?? 4.9;

  const reviewCount = doctor?.reviews ?? 120;

  const imageSrc =
    typeof doctor?.image === "string"
      ? doctor.image
      : doctor?.image?.url || doctor?.image?.src || "/Asset/DocAppoint.png";

  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-linear-to-br from-[#08131f] via-[#102235] to-[#00685f]" />

        <div className="absolute -left-30 -top-30 h-80 w-80 rounded-full bg-[#6bd8cb]/20 blur-3xl" />

        <div className="absolute -right-25 -bottom-25 h-80 w-80 rounded-full bg-[#89f5e7]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* BREADCRUMB */}
          <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span>/</span>

            <Link href="/Doctors" className="transition hover:text-white">
              Doctors
            </Link>

            <span>/</span>

            <span className="font-semibold text-white">{doctor.name}</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-14">
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[40px] bg-white/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl">
                <Image
                  src={imageSrc}
                  alt={doctor.name}
                  width={500}
                  height={500}
                  className="h-80 w-full rounded-[30px] object-cover sm:h-95 lg:h-115"
                  priority
                />

                {/* VERIFIED */}
                <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-[#22c55e] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Verified Doctor
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-xl">
                <FontAwesomeIcon icon={faUserDoctor} />
                Healthcare Specialist
              </div>

              <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">
                {doctor.name}
              </h1>

              <p className="mt-4 text-lg text-[#dce9ff] sm:text-xl lg:text-2xl">
                {doctor.specialty}
              </p>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#dce9ff]/80 sm:text-lg sm:leading-9">
                {doctor.description}
              </p>

              {/* STATS */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <p className="text-sm text-[#dce9ff]/70">Experience</p>

                  <h3 className="mt-3 text-3xl font-black">
                    {doctor.experience}
                  </h3>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <p className="text-sm text-[#dce9ff]/70">Rating</p>

                  <h3 className="mt-3 flex items-center gap-2 text-3xl font-black">
                    <FontAwesomeIcon icon={faStar} className="text-[#fde047]" />
                    {rating}
                  </h3>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <p className="text-sm text-[#dce9ff]/70">Patients</p>

                  <h3 className="mt-3 text-3xl font-black">{reviewCount}+</h3>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/book/${doctor.id}`}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#6bd8cb] px-7 py-4 text-sm font-bold text-[#08131f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#89f5e7] sm:w-auto"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  Book Appointment
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <button className="w-full rounded-2xl border border-white/10 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20 sm:w-auto">
                  Contact Clinic
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* ABOUT */}
            <div className="rounded-[36px] border border-[#bcc9c6]/40 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-8">
              <div className="flex items-start gap-4 sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#dff7f4] text-[#00685f]">
                  <FontAwesomeIcon icon={faHeartPulse} size="lg" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#00685f]">
                    About Doctor
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#0b1c30] sm:text-3xl">
                    Professional Overview
                  </h2>
                </div>
              </div>

              <p className="mt-8 text-base leading-8 text-[#5c6b7a] sm:text-lg sm:leading-9">
                {doctor.description}
              </p>

              {/* INFO */}
              <div className="mt-10 grid gap-4 md:grid-cols-2 sm:gap-5">
                <div className="rounded-[30px] border border-[#dce9ff] bg-[#f8f9ff] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#00685f] shadow-sm">
                      <FontAwesomeIcon icon={faHospital} />
                    </div>

                    <div>
                      <p className="text-sm text-[#7b8a99]">Hospital</p>

                      <h3 className="mt-1 text-xl font-bold text-[#0b1c30]">
                        {doctor.hospital}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-[#dce9ff] bg-[#f8f9ff] p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#00685f] shadow-sm">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <div>
                      <p className="text-sm text-[#7b8a99]">Location</p>

                      <h3 className="mt-1 text-xl font-bold text-[#0b1c30]">
                        {doctor.location}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="rounded-[36px] border border-[#bcc9c6]/40 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#00685f]">
                    Testimonials
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-[#0b1c30]">
                    Patient Reviews
                  </h2>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#fff7d6] px-5 py-3 text-sm font-bold text-[#b88900]">
                  <FontAwesomeIcon icon={faStar} />
                  {rating} Rating
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {reviews.map((review) => (
                  <div
                    key={review.name}
                    className="rounded-[28px] border border-[#e0e3e5] bg-[#fcfdff] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={70}
                        height={70}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <div>
                            <h3 className="text-lg font-bold text-[#0b1c30]">
                              {review.name}
                            </h3>

                            <p className="text-sm text-[#7b8a99]">
                              {review.time}
                            </p>
                          </div>

                          <div className="flex gap-1 text-[#facc15]">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-[#5c6b7a] sm:text-base sm:leading-8">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-8">
            <div className="sticky top-24 overflow-hidden rounded-[36px] bg-[#08131f] p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:p-7">
              <div className="absolute -right-15 -top-15 h-45 w-45 rounded-full bg-[#6bd8cb]/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <FontAwesomeIcon icon={faClock} />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                      Available Slots
                    </p>

                    <h2 className="mt-1 text-2xl font-black">Book Schedule</h2>
                  </div>
                </div>

                {/* SLOTS */}
                <div className="mt-8 space-y-4">
                  {availableSlots.map((slot, index) => (
                    <Link
                      key={slot}
                      href={`/book/${doctor.id}?slot=${encodeURIComponent(
                        slot,
                      )}`}
                      className={`block rounded-[24px] border p-5 transition-all duration-300 hover:-translate-y-1 ${
                        index === 0
                          ? "border-[#6bd8cb]/30 bg-[#6bd8cb]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                            Time
                          </p>

                          <h3 className="mt-2 text-lg font-bold sm:text-xl">
                            {slot}
                          </h3>
                        </div>

                        <div className="rounded-full bg-[#22c55e]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#4ade80]">
                          Open
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* FEE */}
                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-white/50">Consultation Fee</p>

                  <h3 className="mt-3 text-4xl font-black">৳{doctor.fee}</h3>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
  