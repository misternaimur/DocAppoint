/** @format */

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotFoundDisplay from "./Compont/Share-component/NotFoundDisplay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "404 - DocAppoint",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <NotFoundDisplay fullHeight />
      </body>
    </html>
  );
}
