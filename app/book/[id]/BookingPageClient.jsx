/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { useSession } from "../../lib/auth-client";

export default function BookingPageClient({ doctor }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const bookingApiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_DOCTORS_API_URL?.replace(/\/doctors\/?$/, "") ||
    "";

  const bookingsRoot = bookingApiBase
    ? `${bookingApiBase}/bookings`
    : "/api/bookings";
  const userEmail = session?.user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please sign in first.");
      return;
    }

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
      const res = await fetch(bookingsRoot, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      toast.success("Appointment booked successfully!");
      setPatientName("");
      setGender("");
      setPhone("");
      setAppointmentDate("");
      setAppointmentTime("");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8fffc] via-white to-[#f5f9ff] px-4 py-12 sm:px-6 lg:px-8">
      <Toaster />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <aside className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-lg backdrop-blur-lg">
          <div
            className={`rounded-2xl bg-linear-to-br p-6 text-white ${doctor?.accent || "from-emerald-500 to-teal-500"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {doctor?.badge || "Top Rated"}
                </span>
                <h2 className="mt-6 text-3xl font-extrabold">{doctor?.name}</h2>
                <p className="mt-2 text-white/90">{doctor?.specialty}</p>
              </div>

              <div className="flex flex-col items-end">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white/15">
                  <Image
                    src={
                      typeof doctor?.image === "string"
                        ? doctor.image
                        : doctor?.image?.url ||
                          doctor?.image?.src ||
                          "/Asset/DocAppoint.png"
                    }
                    alt={doctor?.name || "Doctor"}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm">
                  <span className="font-semibold">{doctor?.rating ?? 4.8}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-white/90">
              <div className="flex items-center justify-between gap-4">
                <span>Experience</span>
                <strong>{doctor?.experience}</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Hospital</span>
                <span>{doctor?.hospital}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Availability</span>
                <span>{doctor?.availability?.[0]}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-50 bg-white p-4">
            <h3 className="text-lg font-bold text-slate-900">About</h3>
            <p className="mt-3 text-sm text-slate-600">{doctor?.description}</p>
          </div>
        </aside>

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900">
            Book Appointment
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Fill the patient details to confirm your appointment.
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
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-emerald-500 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
