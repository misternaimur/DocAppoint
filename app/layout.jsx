/** @format */

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Compont/Share-component/Navbar";
import Footer from "./Compont/Share-component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocAppoint",
  description: "DocAppoint healthcare scheduling platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface pt-16 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
