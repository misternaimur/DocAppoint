/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Toaster, toast } from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function Login() {

 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  const waitForToast = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session?.user) return;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result?.error) {
        throw new Error(result.error.message || "Login failed");
      }

      toast.success("Login successful!");
      await waitForToast();
      router.push("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (session?.user) return;
    setSocialLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result?.error) {
        throw new Error(result.error.message || "Google login failed");
      }

      if (result?.data?.url) {
        window.location.href = result.data.url;
        return;
      }

      toast.success("Login successful!");
      await waitForToast();
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Google login failed";
      toast.error(message);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f8f9ff" }}
    >
      <Toaster position="top-right" />
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-lg sm:p-8"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #bcc9c6",
        }}
      >
        <h2
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "#0b1c30" }}
        >
          Welcome Back
        </h2>

        <p className="text-center text-sm mb-6" style={{ color: "#6b7280" }}>
          Access your healthcare portal
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={socialLoading}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg py-2 transition"
          style={{
            border: "1px solid #bcc9c6",
            backgroundColor: "#ffffff",
          }}
        >
          <FontAwesomeIcon icon={faGoogle} style={{ color: "#EA4335" }} />
          <span style={{ color: "#0b1c30", fontWeight: 500 }}>
            {socialLoading ? "Connecting..." : "Continue with Google"}
          </span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px" style={{ backgroundColor: "#bcc9c6" }} />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#bcc9c6" }} />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full rounded-lg px-4 py-2 pl-10 outline-none transition"
              style={{ border: "1px solid #bcc9c6" }}
            />
          </div>

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
              className="w-full rounded-lg px-4 py-2 pl-10 outline-none transition"
              style={{ border: "1px solid #bcc9c6" }}
            />
          </div>

          <div className="text-right">
            <Link href="#" style={{ color: "#00685f", fontWeight: 600 }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: "#00685f",
              color: "white",
              opacity: loading ? 0.85 : 1,
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#008378")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#00685f")}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#6b7280" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#00685f", fontWeight: 600 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
