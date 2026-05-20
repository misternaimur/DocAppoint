/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register payload:", { name, email, password, photoUrl });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f8f9ff" }}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-lg p-8"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #bcc9c6",
        }}
      >
        {/* Brand Title */}
        <h2
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "#0b1c30" }}
        >
          Create Your Account
        </h2>

        <p className="text-center text-sm mb-6" style={{ color: "#6b7280" }}>
          Book appointments with trusted doctors
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition"
              style={{
                border: "1px solid #bcc9c6",
              }}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition"
              style={{
                border: "1px solid #bcc9c6",
              }}
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faImage}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Photo URL (optional)"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition"
              style={{
                border: "1px solid #bcc9c6",
              }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition"
              style={{
                border: "1px solid #bcc9c6",
              }}
            />
          </div>

          {/* Primary Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: "#00685f",
              color: "white",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#008378")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#00685f")}
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: "#bcc9c6" }} />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#bcc9c6" }} />
        </div>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-3 py-2 rounded-lg transition"
          style={{
            border: "1px solid #bcc9c6",
            backgroundColor: "#ffffff",
          }}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            style={{ color: "#EA4335" }} // Real Google Red
          />
          <span style={{ color: "#0b1c30", fontWeight: 500 }}>
            Continue with Google
          </span>
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-6" style={{ color: "#6b7280" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#00685f", fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
