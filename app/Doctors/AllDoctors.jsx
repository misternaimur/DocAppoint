/** @format */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faCalendarCheck,
  faMagnifyingGlass,
  faStethoscope,
  faClock,
  faCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { doctors as fallbackDoctors } from "./doctorData";

export default function AllDoctors() {
  const [remoteDoctors, setRemoteDoctors] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) setRemoteDoctors(data);
      })
      .catch((err) => {
        console.error("Failed to fetch doctors:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const list = remoteDoctors || fallbackDoctors;

  return (
    <main className="min-h-screen bg-linear-to-b from-[#f8fffc] via-white to-[#f5f9ff] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-5 py-2 rounded-full shadow-sm text-sm font-semibold text-emerald-700">
                <FontAwesomeIcon icon={faCircleCheck} />
                Trusted Healthcare Platform
              </div>

              <h1 className="mt-7 text-5xl md:text-6xl font-black leading-tight text-slate-900">
                Find The Best
                <span className="block text-emerald-600">
                  Specialist Doctors
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
                Discover experienced doctors, compare specialties, and instantly
                book appointments from the comfort of your home.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                {[
                  {
                    icon: faStethoscope,
                    title: "100+ Doctors",
                    desc: "Expert Specialists",
                  },
                  {
                    icon: faClock,
                    title: "24/7 Support",
                    desc: "Always Available",
                  },
                  {
                    icon: faCalendarCheck,
                    title: "Easy Booking",
                    desc: "Quick Process",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="h-36 rounded-xl border border-emerald-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center px-5"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-emerald-600 text-xl"
                      />
                    </div>

                    <h3 className="font-bold text-slate-900">{item.title}</h3>

                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-[2.5rem] p-8 shadow-[0_25px_80px_rgba(16,185,129,0.10)]">
              <h2 className="text-2xl font-bold text-slate-900">
                Book Appointment
              </h2>

              <p className="text-slate-500 mt-2">
                Search doctors and schedule appointments instantly.
              </p>

              {/* SEARCH */}
              <div className="mt-8 space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Search Doctor
                  </label>

                  <div className="h-14 rounded-2xl border border-slate-200 bg-slate-50 flex items-center px-4 gap-3">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Search doctor or specialty"
                      className="w-full bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Select Specialty
                  </label>

                  <select className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none">
                    <option>All Specialties</option>
                    <option>Cardiologist</option>
                    <option>Neurologist</option>
                    <option>Dermatologist</option>
                    <option>Orthopedic</option>
                  </select>
                </div>

                <button className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold text-base shadow-lg hover:scale-[1.02] transition-all duration-300">
                  Find Doctors
                </button>
              </div>

              {/* BOTTOM CARD */}
              <div className="mt-8 rounded-3xl bg-linear-to-r from-emerald-500 to-teal-500 p-6 text-white">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-bold">Need Emergency Help?</h3>

                    <p className="mt-2 text-sm text-white/90 leading-6">
                      Connect with trusted doctors immediately and receive
                      quality healthcare support.
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="text-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                Available Doctors
              </h2>

              <p className="mt-3 text-slate-500 text-lg">
                Trusted specialists available for appointments.
              </p>
            </div>

            <Link
              href="/register"
              className="h-14 px-7 rounded-2xl border border-emerald-200 bg-white text-emerald-700 font-semibold inline-flex items-center justify-center gap-3 shadow-sm hover:bg-emerald-50 transition"
            >
              Join Now
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {list.map((doctor, index) => {
              const accents = [
                "from-emerald-500 to-teal-500",
                "from-sky-500 to-cyan-500",
                "from-rose-500 to-pink-500",
                "from-amber-500 to-orange-500",
              ];

              const initials =
                doctor.initials ||
                (doctor.name || "")
                  .split(" ")
                  .filter((part) => part !== "Dr.")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("");

              const accent = doctor.accent || accents[index % accents.length];
              const mode = doctor.mode || "In-person & Online";
              const availability = Array.isArray(doctor.availability)
                ? doctor.availability[0]
                : doctor.availability || "";

              return (
              <article
                key={doctor.id}
                className="group bg-white border border-emerald-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                {/* TOP */}
                <div
                  className={`bg-linear-to-br ${accent} p-7 text-white h-52 flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between">
                    <span className="px-4 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide">
                      {doctor.badge}
                    </span>

                      <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-lg font-bold">
                      {initials}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">{doctor.name}</h3>

                    <p className="mt-2 text-white/90">{doctor.specialty}</p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  {/* RATING */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 px-4 rounded-full bg-emerald-50 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-amber-500"
                      />
                      {doctor.rating ?? 4.8}
                    </div>

                    <span className="text-xs text-slate-400 font-medium">
                      {mode}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-6 space-y-4 text-sm text-slate-600 flex-1">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-emerald-600"
                      />
                      <span>{doctor.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-emerald-600"
                      />
                      <span>{availability}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-emerald-600"
                      />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-8 flex gap-3">
                    <Link
                      href="/register"
                      className="flex-1 h-12 rounded-2xl bg-emerald-600 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-emerald-700 transition"
                    >
                      Book Now
                    </Link>

                    <Link
                      href={`/doctor/${doctor.id}`}
                      className="flex-1 h-12 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
