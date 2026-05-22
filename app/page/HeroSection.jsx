/** @format */

"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  { id: 1, image: "/Asset/Banner-1.jpg" },
  { id: 2, image: "/Asset/Banner-2.jpg" },
  { id: 3, image: "/Asset/Banner-3.jpg" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[70svh] w-full overflow-hidden bg-slate-900 md:h-[88vh] md:min-h-135">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/55 to-black/20" />

              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-16 sm:px-6 md:px-10">
                <div className="max-w-2xl text-white">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-400/20 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-100 md:text-sm">
                    <span>Trusted by 10,000+ Patients</span>
                  </div>

                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                    Book Your Doctor
                    <br />
                    <span className="text-emerald-300">
                      Appointment Instantly
                    </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm text-white/90 sm:text-base md:text-lg">
                    Skip long waiting lines and connect with top doctors
                    quickly. Fast booking, expert care, and a smoother
                    healthcare experience.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/Doctors"
                      className="w-full rounded-full bg-[#00685f] px-7 py-3 text-center text-sm font-bold text-white transition hover:bg-[#008378] sm:w-auto md:text-base"
                    >
                      Book Appointment
                    </Link>
                    <Link
                      href="/Doctors"
                      className="w-full rounded-full border border-white/70 px-7 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto md:text-base"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
