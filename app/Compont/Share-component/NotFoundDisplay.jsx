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
} from "@fortawesome/free-solid-svg-icons";

export default function NotFoundDisplay({ fullHeight = false }) {
  const router = useRouter();

  return (
    <main
      className={`relative flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 ${
        fullHeight ? "min-h-screen" : "min-h-[calc(100vh-8rem)]"
      } bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_30%),linear-gradient(to_bottom,#f7fffc,#f8fbff_42%,#ffffff)]`}
    >
      <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 md:p-12">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-400 via-teal-500 to-sky-500" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                404 - Page not found
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                  <FontAwesomeIcon icon={faStethoscope} className="text-3xl" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                    DocAppoint
                  </p>
                  <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    We could not find that page.
                  </h1>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                The link may be broken, the page may have moved, or the address
                was typed incorrectly. Use the buttons below to get back to the
                appointment flow or continue browsing doctors.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 px-6 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faHouse} />
                  Back to Home
                </Link>

                <Link
                  href="/Doctors"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-50"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Browse Doctors
                </Link>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-transparent px-6 font-semibold text-slate-500 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-700"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Go Back
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[2rem] border border-emerald-100 bg-linear-to-br from-white via-emerald-50 to-sky-50 p-6 shadow-inner shadow-emerald-500/5">
                <div className="absolute inset-8 rounded-full border border-dashed border-emerald-200/80" />
                <div className="absolute inset-16 rounded-full border border-dashed border-sky-200/80" />

                <div className="absolute left-10 top-14 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Fast Access
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Search a doctor or book a visit
                  </p>
                </div>

                <div className="absolute bottom-12 right-10 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Support
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Trusted care, anytime
                  </p>
                </div>

                <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 via-teal-500 to-sky-500 shadow-[0_25px_60px_rgba(16,185,129,0.25)]">
                  <div className="absolute inset-3 rounded-full border border-white/25" />
                  <div className="absolute inset-8 rounded-full bg-white/12 backdrop-blur-sm" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-emerald-600 shadow-xl">
                    <span className="text-5xl font-black tracking-tight">
                      404
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 font-medium text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Verified doctors
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 font-medium text-sky-700">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Instant booking
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 font-medium text-amber-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  24/7 support
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
