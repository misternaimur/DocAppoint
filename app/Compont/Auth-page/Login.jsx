/** @format */

"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-110 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 shadow-[0_6px_24px_rgba(13,148,136,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,148,136,0.12)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[30px] font-bold text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Access your healthcare portal
          </p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border-2 border-primary rounded-full py-3 px-6 font-semibold transition-all duration-200 hover:bg-primary/5 mb-8">
          <FontAwesomeIcon
            icon={faGoogle}
            className="text-lg"
            style={{ color: "#EA4335" }} // Real Google Red
          />
          <span className="text-primary">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="grow h-px bg-outline-variant/50" />
          <span className="text-xs font-semibold tracking-wider text-secondary uppercase">
            — or —
          </span>
          <div className="grow h-px bg-outline-variant/50" />
        </div>

        {/* Form */}
        <form
          className="space-y-7"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="ml-2 text-sm font-medium text-on-surface-variant"
            >
              Email Address
            </label>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>

              <input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none rounded-xl transition-all text-base text-on-surface"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="ml-2 text-sm font-medium text-on-surface-variant"
            >
              Password
            </label>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <FontAwesomeIcon icon={faLock} />
              </span>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-2 border-transparent focus:border-primary focus:outline-none rounded-xl transition-all text-base text-on-surface"
              />
            </div>

            <div className="text-right mt-2">
              <Link
                href="#"
                className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full bg-primary text-on-primary rounded-full py-4 font-bold hover:bg-primary-container active:scale-95 transition-all shadow-md text-lg flex items-center justify-center gap-2">
            Login
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-base text-on-surface-variant">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="text-primary font-bold hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
    