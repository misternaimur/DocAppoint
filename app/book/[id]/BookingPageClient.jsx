/** @format */

"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSession } from "../../lib/auth-client";

export default function BookingPageClient({ doctor }) {
  const { data: session } = useSession();

  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const userEmail = session?.user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !patientName ||
      !gender ||
      !phone ||
      !appointmentDate ||
      !appointmentTime
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingData = {
      userEmail,
      doctorName: doctor?.name || "",
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
    };

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      toast.success("Appointment booked successfully!");
      // Optionally reset fields
      setPatientName("");
      setGender("");
      setPhone("");
      setAppointmentDate("");
      setAppointmentTime("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8fffc] via-white to-[#f5f9ff] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Doctor Card */}
        <aside className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-lg border border-emerald-100 shadow-lg p-6">
          <div
            className={`rounded-2xl p-6 bg-linear-to-br ${doctor?.accent || "from-emerald-500 to-teal-500"} text-white`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
                  {doctor?.badge || "Top Rated"}
                </span>
                <h2 className="mt-6 text-3xl font-extrabold">{doctor?.name}</h2>
                <p className="mt-2 text-white/90">{doctor?.specialty}</p>
              </div>

              <div className="flex flex-col items-end">
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center text-xl font-bold">
                  {doctor?.initials}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/10 text-sm px-3 py-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.371 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.371-2.455a1 1 0 00-1.176 0l-3.371 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                  <span className="font-semibold">{doctor?.rating ?? 4.8}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/90">
              <div className="flex items-center justify-between">
                <span>Experience</span>
                <strong>{doctor?.experience}</strong>
              </div>

              <div className="flex items-center justify-between">
                <span>Hospital</span>
                <span>{doctor?.hospital}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Availability</span>
                <span>{doctor?.availability?.[0]}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-2xl border border-emerald-50">
            <h3 className="text-lg font-bold text-slate-900">About</h3>
            <p className="mt-3 text-sm text-slate-600">{doctor?.description}</p>
          </div>
        </aside>

        {/* Right: Booking Form */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border border-emerald-100">
          <h2 className="text-2xl font-bold text-slate-900">
            Book Appointment
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Fill patient details to confirm your appointment.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Patient Name
              </label>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Enter patient full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Appointment Date
                </label>
                <input
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  type="date"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Appointment Time
                </label>
                <input
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  type="time"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Your Email
              </label>
              <input
                value={userEmail}
                readOnly
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-slate-50"
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className={`w-full rounded-xl px-6 py-3 font-semibold text-white ${loading ? "bg-emerald-300" : "bg-emerald-600 hover:bg-emerald-700"}`}
              >
                {loading ? "Booking..." : `Confirm Appointment`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
