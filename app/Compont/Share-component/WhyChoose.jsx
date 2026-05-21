/** @format */

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faUserShield,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function WhyChoose() {
  const features = [
    {
      icon: faCalendarCheck,
      title: "Instant Booking",
      desc: "Book doctor appointments instantly without waiting in long queues or making phone calls.",
    },
    {
      icon: faUserShield,
      title: "Verified Doctors",
      desc: "All doctors are professionally verified to ensure trusted and reliable healthcare service.",
    },
    {
      icon: faClock,
      title: "Flexible Scheduling",
      desc: "Choose appointment times that perfectly match your busy daily routine.",
    },
    {
      icon: faStar,
      title: "Top Rated Care",
      desc: "Get healthcare support from highly rated specialists trusted by thousands of patients.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#f8fbff] to-white overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-4">
            Why People Trust Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Why Choose <span className="text-emerald-600">DocAppoint</span>?
          </h2>

          <p className="mt-5 text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            We simplify healthcare by connecting patients with trusted doctors
            through a fast, secure, and user-friendly appointment system.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-8 border border-emerald-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition duration-500"></div>

              {/* Icon */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={f.icon}
                  className="text-white text-2xl"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>

              {/* Bottom Border */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Explore Doctors
          </button>

          <p className="mt-5 text-sm text-slate-500">
            Trusted by thousands of patients every day.
          </p>
        </div>
      </div>
    </section>
  );
}
