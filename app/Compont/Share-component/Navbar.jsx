/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../public/Asset/DocAppoint.png";
import { authClient } from "../../lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function linkClass(href) {
    const base =
      "relative inline-flex items-center px-1 py-1 transition transform duration-200 hover:-translate-y-1 active:scale-95";
    const active = pathname && (pathname === href || pathname.startsWith(href));
    return `${base} ${active ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"}`;
  }

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
  }

  const user = session?.user;
  const userImage = user?.image;
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="DocAppoint Logo" width={45} height={45} />
          <h1 className="text-xl font-bold text-emerald-600">DocAppoint</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass("/") + " font-medium pb-1"}>
            <span className="group">
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-600 group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          <Link href="/Doctors" className={linkClass("/Doctors")}>
            <span className="group">
              All Doctors
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-600 group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          <a href="#" className={linkClass("/dashboard")}>
            <span className="group">
              Dashboard
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-600 group-hover:w-full transition-all duration-300" />
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-10 w-24 rounded-full bg-emerald-50 animate-pulse" />
            ) : user ? (
              <>
                <div className="h-10 w-10 overflow-hidden rounded-full border border-emerald-200 bg-emerald-50">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={user.name || "User profile picture"}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-emerald-700">
                      {userInitial}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 active:scale-95 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-emerald-200 px-5 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white transition hover:opacity-90"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="menu"
          >
            {open ? (
              <svg width="24" height="24" fill="none" stroke="currentColor">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-4 py-3 space-y-3">
            <Link href="/" className="text-emerald-600 font-medium py-2">
              Home
            </Link>

            <Link
              href="/Doctors"
              className="text-gray-600 hover:text-emerald-600 py-2"
            >
              All Doctors
            </Link>

            <Link
              href="#"
              className="text-gray-600 hover:text-emerald-600 py-2"
            >
              Dashboard
            </Link>

            <div className="flex items-center gap-3 pt-2">
              {isPending ? (
                <div className="h-10 w-full rounded-full bg-emerald-50 animate-pulse" />
              ) : user ? (
                <>
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-emerald-200 bg-emerald-50">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={user.name || "User profile picture"}
                        width={40}
                        height={40}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-emerald-700">
                        {userInitial}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-full text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex-1 rounded-full border border-emerald-200 py-2 text-center font-semibold text-emerald-700"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="flex-1 rounded-full bg-emerald-600 py-2 text-center font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
