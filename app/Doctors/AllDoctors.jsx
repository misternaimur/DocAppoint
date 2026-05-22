/** @format */

"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { authClient } from "../lib/auth-client";

export default function AllDoctors() {
  const [remoteDoctors, setRemoteDoctors] = useState(null);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  function handleDoctorClick(event) {
    if (!session?.user) {
      event.preventDefault();
      router.push("/login");
    }
  }

  function getDoctorImageSrc(doctor) {
    return typeof doctor?.image === "string"
      ? doctor.image
      : doctor?.image?.url || doctor?.image?.src || "/Asset/DocAppoint.png";
  }

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

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e?.preventDefault?.();
    setSearchQuery((searchInput || "").trim().toLowerCase());
  }

  function clearSearch() {
    setSearchInput("");
    setSearchQuery("");
  }

  const displayedList = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return list;
    return list.filter((d) => {
      const name = (d.name || "").toString().toLowerCase();
      const specialty = (d.specialty || "").toString().toLowerCase();
      return name.includes(q) || specialty.includes(q);
    });
  }, [list, searchQuery]);

  return (
    <main className="min-h-screen bg-linear-to-b from-[#f8fffc] via-white to-[#f5f9ff] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pt-28 lg:pb-24">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-5 py-2 rounded-full shadow-sm text-sm font-semibold text-emerald-700">
                <FontAwesomeIcon icon={faCircleCheck} />
                Trusted Healthcare Platform
              </div>

              <h1 className="mt-7 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-6xl">
                Find The Best
                <span className="block text-emerald-600">
                  Specialist Doctors
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Discover experienced doctors, compare specialties, and instantly
                book appointments from the comfort of your home.
              </p>

              {/* STATS */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
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
                    className="flex h-32 flex-col items-center justify-center rounded-xl border border-emerald-100 bg-white px-5 text-center shadow-sm transition-all duration-300 hover:shadow-xl sm:h-36"
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
            <div className="rounded-[2rem] border border-emerald-100 bg-white/90 p-5 shadow-[0_25px_80px_rgba(16,185,129,0.10)] backdrop-blur-xl sm:p-8">
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

                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Search doctor or specialty"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="h-14 flex-1 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Find Doctors
                  </button>

                  <button
                    type="button"
                    onClick={clearSearch}
                    className="h-14 rounded-2xl border bg-white px-4 font-semibold text-slate-700"
                  >
                    Clear
                  </button>
                </div>
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
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Available Doctors
              </h2>

              <p className="mt-3 text-base text-slate-500 sm:text-lg">
                Trusted specialists available for appointments.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-white px-7 font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              Join Now
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {displayedList.map((doctor, index) => {
              const accents = [
                "from-emerald-500 to-teal-500",
                "from-sky-500 to-cyan-500",
                "from-rose-500 to-pink-500",
                "from-amber-500 to-orange-500",
              ];

              const imageSrc = getDoctorImageSrc(doctor);

              const accent = doctor.accent || accents[index % accents.length];
              const mode = doctor.mode || "In-person & Online";
              const doctorId = String(doctor.id || doctor._id || "").trim();
              const availability = Array.isArray(doctor.availability)
                ? doctor.availability[0]
                : doctor.availability || "";

              return (
                <article
                  key={doctorId || doctor.name}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)]"
                >
                  {/* TOP */}
                  <div
                    className={`bg-linear-to-br ${accent} flex h-52 flex-col justify-between p-6 text-white sm:p-7`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-4 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide">
                        {doctor.badge}
                      </span>

                      <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/20 bg-white/15">
                        <Image
                          src={imageSrc}
                          alt={doctor.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {doctor.name}
                      </h3>

                      <p className="mt-2 text-sm text-white/90 sm:text-base">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* RATING */}
                    <div className="flex items-center justify-between gap-3">
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
                    <div className="mt-6 flex-1 space-y-4 text-sm text-slate-600">
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
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={doctorId ? `/doctor/${doctorId}` : "/Doctors"}
                        onClick={doctorId ? handleDoctorClick : undefined}
                        className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Book Now
                      </Link>

                      <Link
                        href={doctorId ? `/doctor/${doctorId}` : "/Doctors"}
                        className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
