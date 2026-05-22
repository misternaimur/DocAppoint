/** @format */

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import {
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  Activity,
  UserRound,
  ShieldCheck,
  Sparkles,
  X,
  Phone,
} from "lucide-react";

import { authClient } from "../lib/auth-client";

const bookingsRoot = "/api/bookings";

export default function DashboardPage() {
  const router = useRouter();

  const { useSession } = authClient;
  const { data: session, isPending, refetch } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [editing, setEditing] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    photo: "",
  });

  const loadBookings = useCallback(async () => {
    const userId = session?.user?.id;
    const email = session?.user?.email;

    if (!userId && !email) {
      setBookings([]);
      return;
    }

    const url = `${bookingsRoot}?${new URLSearchParams({
      ...(userId ? { userId } : {}),
      ...(email ? { email } : {}),
    }).toString()}`;

    const res = await fetch(url);
    const data = await res.json();

    setBookings(Array.isArray(data) ? data : []);
  }, [session?.user?.id, session?.user?.email]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;

    async function fetchBookings() {
      setLoading(true);

      try {
        await loadBookings();
      } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [session, loadBookings]);

  function handleSearch(e) {
    e?.preventDefault?.();
    setSearchQuery((searchInput || "").trim().toLowerCase());
  }

  function clearSearch() {
    setSearchInput("");
    setSearchQuery("");
  }

  const displayedBookings = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return bookings;
    return bookings.filter((b) => {
      const name = (b.doctorName || b.doctor || "").toString().toLowerCase();
      return name.includes(q);
    });
  }, [bookings, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      upcoming: bookings.length,
      completed: Math.floor(bookings.length / 2),
    };
  }, [bookings]);

  function openEdit(booking) {
    setEditing({ ...booking });
  }

  function closeEdit() {
    setEditing(null);
  }

  async function deleteBooking(booking) {
    const id = booking._id || booking.id;
    const userId = session?.user?.id || booking.userId;
    const userEmail = session?.user?.email || booking.userEmail;

    if (!confirm("Delete this appointment?")) return;

    try {
      const deleteParams = new URLSearchParams();

      if (userId) deleteParams.set("userId", userId);
      if (userEmail) deleteParams.set("email", userEmail);

      const res = await fetch(
        `${bookingsRoot}/${id}${deleteParams.toString() ? `?${deleteParams.toString()}` : ""}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }

      await loadBookings();

      toast.success("Appointment deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete appointment");
    }
  }

  async function saveEdit(e) {
    e.preventDefault();

    if (!editing) return;

    const id = editing._id || editing.id;
    const userId = session?.user?.id || editing.userId;
    const userEmail = session?.user?.email || editing.userEmail;
    const payload = {
      ...editing,
      userId,
      userEmail,
      doctorName: editing.doctorName || editing.doctor || "",
    };

    try {
      const res = await fetch(`${bookingsRoot}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Update failed");
      }

      await res.json();
      await loadBookings();

      closeEdit();

      toast.success("Appointment updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  }

  async function saveProfile(e) {
    e.preventDefault();

    try {
      // send update to Better Auth endpoint
      const body = {
        ...(profile.name ? { name: profile.name } : {}),
        ...(profile.photo ? { image: profile.photo } : {}),
      };

      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "same-origin",
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to update profile");
      }

      // refresh session data so UI shows updated name/photo
      try {
        if (typeof refetch === "function") await refetch();
        else await authClient.getSession();
      } catch (e) {
        console.warn("Failed to refetch session after profile update", e);
      }

      setProfileOpen(false);

      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  }

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-50 via-white to-emerald-50">
        <div className="animate-pulse text-xl font-semibold text-slate-700">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-emerald-50 px-4 py-10">
      <Toaster />

      <div className="mx-auto max-w-7xl">
        {/* TOP HEADER */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              Welcome Back 👋
            </p>

            <h1 className="mt-2 text-4xl font-black text-slate-900">
              Healthcare Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your appointments and profile information.
            </p>
          </div>

          <button
            onClick={() => {
              setProfile({
                name: session.user?.name || "",
                photo: session.user?.image || "",
              });

              setProfileOpen(true);
            }}
            className="rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 sm:self-start"
          >
            Edit Profile
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* PROFILE CARD */}
            <div className="rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-[0_20px_80px_rgba(16,185,129,0.12)] backdrop-blur-xl">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400 blur-xl opacity-40" />

                  <Image
                    src={session.user?.image || "/Asset/DocAppoint.png"}
                    alt="User"
                    width={110}
                    height={110}
                    className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-black text-slate-900">
                  {session.user?.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {session.user?.email}
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <ShieldCheck size={16} />
                  Verified Patient
                </div>
              </div>

              {/* QUICK STATS */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-400 p-5 text-white shadow-lg">
                  <div className="text-3xl font-black">{stats.total}</div>

                  <div className="mt-2 text-sm opacity-90">
                    Total Appointments
                  </div>
                </div>

                <div className="rounded-3xl bg-linear-to-br from-cyan-500 to-sky-400 p-5 text-white shadow-lg">
                  <div className="text-3xl font-black">{stats.upcoming}</div>

                  <div className="mt-2 text-sm opacity-90">Upcoming</div>
                </div>
              </div>
            </div>

            {/* HEALTH CARD */}
            <div className="rounded-[2rem] bg-linear-to-br from-slate-900 to-slate-800 p-7 text-white shadow-2xl">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-400" />

                <h3 className="text-xl font-bold">Health Tips</h3>
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                Stay hydrated, exercise regularly, and keep your appointments on
                time for a healthier life.
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lg:col-span-2">
            {/* STATS */}
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500">Appointments</p>

                    <h2 className="mt-2 text-4xl font-black text-slate-900">
                      {stats.total}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                    <CalendarDays />
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500">Upcoming</p>

                    <h2 className="mt-2 text-4xl font-black text-slate-900">
                      {stats.upcoming}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
                    <Activity />
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500">Completed</p>

                    <h2 className="mt-2 text-4xl font-black text-slate-900">
                      {stats.completed}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-purple-100 p-4 text-purple-600">
                    <ShieldCheck />
                  </div>
                </div>
              </div>
            </div>

            {/* BOOKINGS */}
            <div className="mt-8 rounded-[2rem] border border-white/50 bg-white/70 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    My Appointments
                  </h2>

                  <p className="mt-1 text-slate-500">
                    Manage your doctor appointments easily.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    {displayedBookings.length} Total
                  </div>

                  <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      placeholder="Search by doctor name"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 outline-none sm:w-56"
                    />

                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white"
                    >
                      Search
                    </button>

                    <button
                      type="button"
                      onClick={clearSearch}
                      className="rounded-lg border px-3 py-2 text-sm font-semibold"
                    >
                      Clear
                    </button>
                  </form>
                </div>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="mt-8 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-32 animate-pulse rounded-3xl bg-slate-200"
                    />
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {!loading && bookings.length === 0 && (
                <div className="py-20 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                    <CalendarDays className="text-slate-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-800">
                    No Bookings Yet
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Book your first appointment today.
                  </p>
                </div>
              )}

              {/* BOOKING CARDS */}
              <div className="mt-8 grid gap-6">
                {displayedBookings.map((b) => (
                  <div
                    key={b._id || b.id}
                    className="group rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      {/* LEFT */}
                      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-500 to-cyan-500 text-white shadow-xl">
                          <UserRound size={35} />
                        </div>

                        <div>
                          <h2 className="text-2xl font-black text-slate-900">
                            {b.doctorName || b.doctor || "Unknown"}
                          </h2>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <CalendarDays size={16} />
                              {b.appointmentDate}
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock3 size={16} />
                              {b.appointmentTime}
                            </div>

                            <div className="flex items-center gap-2">
                              <Phone size={16} />
                              {b.phone}
                            </div>
                          </div>

                          <div className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                            Upcoming
                          </div>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          onClick={() => openEdit(b)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <Pencil size={18} />
                          Update
                        </button>

                        <button
                          onClick={() => deleteBooking(b)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            onSubmit={saveEdit}
            className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900">
                Update Appointment
              </h2>

              <button
                type="button"
                onClick={closeEdit}
                className="rounded-full bg-slate-100 p-2"
              >
                <X />
              </button>
            </div>

            <div className="mt-8 grid gap-5">
              <input
                value={editing.doctorName || editing.doctor || ""}
                readOnly
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none"
                aria-label="Doctor name"
              />

              <input
                value={editing.userEmail || session?.user?.email || ""}
                readOnly
                className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none"
                aria-label="User email"
              />

              <input
                value={editing.patientName || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    patientName: e.target.value,
                  })
                }
                placeholder="Patient Name"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none"
              />

              <select
                value={editing.gender || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    gender: e.target.value,
                  })
                }
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                value={editing.appointmentDate || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    appointmentDate: e.target.value,
                  })
                }
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none"
              />

              <input
                type="time"
                value={editing.appointmentTime || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    appointmentTime: e.target.value,
                  })
                }
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none"
              />

              <input
                value={editing.phone || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone Number"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-2xl border px-6 py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROFILE MODAL */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            onSubmit={saveProfile}
            className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-black text-slate-900">
              Update Profile
            </h2>

            <div className="mt-8 space-y-5">
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                placeholder="Your Name"
                className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none"
              />

              <input
                value={profile.photo}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    photo: e.target.value,
                  })
                }
                placeholder="Photo URL"
                className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none"
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-2xl border px-6 py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
