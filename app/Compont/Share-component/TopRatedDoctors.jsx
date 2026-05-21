/** @format */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faClock,
  faCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { doctors } from "../../Doctors/doctorData";

export default function TopRatedDoctors() {
  const topDoctors = [...doctors]
    .sort((left, right) => right.rating - left.rating)
    .slice(0, 3);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100/60 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-100/60 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            <FontAwesomeIcon icon={faStar} className="text-amber-500" />
            Top Rated Specialists
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Meet Our <span className="text-emerald-600">Top Rated Doctors</span>
          </h2>

          <p className="mt-5 mx-auto max-w-3xl text-lg text-slate-500 leading-relaxed">
            Explore some of the highest rated doctors on DocAppoint and book the
            specialist that best matches your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {topDoctors.map((doctor) => (
            <article
              key={doctor.id}
              className="group overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(16,185,129,0.14)]"
            >
              <div
                className={`bg-linear-to-br ${doctor.accent} p-7 text-white min-h-56 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                    {doctor.badge}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-8">
                  <div>
                    <h3 className="text-2xl font-bold">{doctor.name}</h3>
                    <p className="mt-2 text-white/90">{doctor.specialty}</p>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-lg font-bold">
                    {doctor.initials}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <FontAwesomeIcon icon={faStar} className="text-amber-500" />
                    {doctor.rating} / 5.0
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    {doctor.reviews} reviews
                  </span>
                </div>

                <div className="mt-6 space-y-4 text-sm text-slate-600">
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
                    <span>{doctor.mode}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-emerald-600"
                    />
                    <span>{doctor.experience} experience</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Link
                    href={`/doctor/${doctor.id}`}
                    className="flex-1 h-12 rounded-2xl bg-emerald-600 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-emerald-700 transition"
                  >
                    View Details
                  </Link>

                  <Link
                    href="/Doctors"
                    className="flex-1 h-12 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm inline-flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    All Doctors
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/Doctors"
            className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Browse All Doctors
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
}
