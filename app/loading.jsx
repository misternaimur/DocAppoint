/** @format */

import { Spinner } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse, faStethoscope } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_30%),linear-gradient(to_bottom,#f8fffc,#f9fbff_50%,#ffffff)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute -left-16 top-12 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-16 bottom-12 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/85 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25">
          <FontAwesomeIcon icon={faStethoscope} className="text-4xl" />
        </div>

        <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Preparing your care dashboard
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          Please wait while we load the doctors, booking details, and your next
          step. This usually takes only a moment.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Spinner size="lg" color="success" />

          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Loading
            </p>
            <p className="mt-1 text-base font-semibold text-slate-700">
              Syncing appointments and profiles
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Verifying doctors
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 font-medium text-sky-700">
            <FontAwesomeIcon icon={faHeartPulse} />
            Updating care data
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 font-medium text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse [animation-delay:150ms]" />
            Almost ready
          </span>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            "Searching doctors",
            "Loading booking tools",
            "Building your view",
          ].map((label, index) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 text-sm font-medium text-slate-500"
            >
              <div className="mx-auto mb-3 h-2 w-16 rounded-full bg-slate-200 overflow-hidden">
                <span
                  className="block h-full w-1/2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 animate-pulse"
                  style={{ animationDelay: `${index * 140}ms` }}
                />
              </div>
              {label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
