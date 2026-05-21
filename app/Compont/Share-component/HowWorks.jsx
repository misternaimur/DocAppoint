/** @format */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarCheck,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

export default function HowWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-white to-emerald-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-4">
            Easy Process
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            How <span className="text-emerald-600">DocAppoint</span> Works
          </h2>

          <p className="mt-5 text-slate-500 text-lg max-w-2xl mx-auto">
            Book appointments with trusted doctors in just a few simple steps
            and receive quality healthcare easily.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Line */}
          <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 rounded-full"></div>

          {/* Card 1 */}
          <div className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition"></div>

              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              <div className="absolute -top-2 -right-2 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
                1
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Find a Doctor
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Search from experienced specialists by category, location, or
              availability and choose the best doctor for your healthcare needs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group md:-mt-10">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition"></div>

              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </div>

              <div className="absolute -top-2 -right-2 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
                2
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Book Appointment
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Select your preferred date and time slot, then confirm your
              appointment instantly with a smooth booking experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 group">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition"></div>

              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
                <FontAwesomeIcon icon={faStethoscope} />
              </div>

              <div className="absolute -top-2 -right-2 w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
                3
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Get Treated
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Visit your doctor at the scheduled time and receive high-quality
              healthcare support with complete comfort and trust.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Get Started Now
          </button>

          <p className="mt-5 text-slate-500 text-sm">
            No registration required to explore doctors and services.
          </p>
        </div>
      </div>
    </section>
  );
}
