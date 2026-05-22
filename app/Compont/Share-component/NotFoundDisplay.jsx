/** @format */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHouse,
  faStethoscope,
  faTriangleExclamation,
  faMagnifyingGlass,
  faHeartPulse,
  faShieldHeart,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function NotFoundDisplay({ fullHeight = false }) {
  const router = useRouter();

  return (
    <main
      className={`relative overflow-hidden flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 ${
        fullHeight ? "min-h-screen" : "min-h-[calc(100vh-8rem)]"
      } bg-gradient-to-b from-[#f7fffc] via-white to-[#f5f9ff]`}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-emerald-100/20 rounded-full blur-3xl"></div>

      <section className="relative z-10 w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/80 backdrop-blur-2xl shadow-[0_30px_100px_rgba(16,185,129,0.12)]">
          {/* Top Border */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500"></div>

          <div className="grid lg:grid-cols-2 gap-14 p-8 sm:p-10 lg:p-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Error 404 • Page Missing
              </div>

              {/* Heading */}
              <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-slate-900">
                Oops!
                <span className="block text-emerald-600">Page Not Found</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
                The page you are trying to access may have been removed,
                renamed, or temporarily unavailable. Continue browsing trusted
                doctors and healthcare services with DocAppoint.
              </p>

              {/* Features */}
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: faShieldHeart,
                    title: "Verified Care",
                  },
                  {
                    icon: faCalendarCheck,
                    title: "Easy Booking",
                  },
                  {
                    icon: faHeartPulse,
                    title: "24/7 Support",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="h-28 rounded-3xl border border-emerald-100 bg-white shadow-sm flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-3 shadow-lg">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>

                    <p className="font-semibold text-slate-800 text-sm">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold inline-flex items-center justify-center gap-3 shadow-lg hover:scale-[1.03] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faHouse} />
                  Back Home
                </Link>

                <Link
                  href="/Doctors"
                  className="h-14 px-8 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold inline-flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Find Doctors
                </Link>

                <button
                  onClick={() => router.back()}
                  className="h-14 px-8 rounded-2xl text-slate-600 font-semibold inline-flex items-center justify-center gap-3 hover:bg-slate-100 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Go Back
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative flex justify-center">
              {/* Outer Glow */}
              <div className="absolute w-[420px] h-[420px] bg-emerald-400/10 rounded-full blur-3xl"></div>

              {/* Main Circle */}
              <div className="relative w-[360px] h-[360px] rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 shadow-[0_30px_80px_rgba(16,185,129,0.25)] flex items-center justify-center">
                {/* Rings */}
                <div className="absolute inset-5 rounded-full border border-white/20"></div>
                <div className="absolute inset-12 rounded-full border border-dashed border-white/20"></div>

                {/* Floating Cards */}
                <div className="absolute top-6 left-0 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <FontAwesomeIcon icon={faStethoscope} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">
                        Specialist
                      </p>

                      <h4 className="font-bold text-slate-800 text-sm">
                        Trusted Doctors
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-0 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                      <FontAwesomeIcon icon={faCalendarCheck} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">
                        Booking
                      </p>

                      <h4 className="font-bold text-slate-800 text-sm">
                        Instant Access
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Center */}
                <div className="relative z-10 w-56 h-56 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-4xl shadow-lg">
                    <FontAwesomeIcon icon={faStethoscope} />
                  </div>

                  <h2 className="mt-5 text-7xl font-black text-slate-900 leading-none">
                    404
                  </h2>

                  <p className="mt-2 text-slate-500 font-medium">
                    Page Missing
                  </p>
                </div>
              </div>

              {/* Floating Dots */}
              <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-emerald-400 animate-pulse"></div>
              <div className="absolute bottom-16 left-6 w-3 h-3 rounded-full bg-sky-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
