/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../../public/Asset/DocAppoint.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: faFacebook,
      href: "https://facebook.com/misternaimur",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: faTwitter,
      href: "https://twitter.com/misternaimur",
      color: "hover:text-sky-400",
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      href: "https://linkedin.com/in/misternaimur",
      color: "hover:text-blue-700",
    },
    {
      name: "Instagram",
      icon: faInstagram,
      href: "https://instagram.com/misternaimur",
      color: "hover:text-pink-500",
    },
    {
      name: "GitHub",
      icon: faGithub,
      href: "https://github.com/misternaimur",
      color: "hover:text-gray-800",
    },
    {
      name: "YouTube",
      icon: faYoutube,
      href: "https://youtube.com/@misternaimur",
      color: "hover:text-red-600",
    },
  ];

  return (
    <footer className="bg-linear-to-r from-emerald-50 to-teal-50 border-t border-emerald-200 mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="DocAppoint Logo" width={40} height={40} />
              <h2 className="text-xl font-bold text-emerald-600">DocAppoint</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Simplifying healthcare appointments with modern technology. Your
              health, our priority.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`text-gray-500 text-xl transition duration-300 ${social.color}`}
                  title={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Appointments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-emerald-200" />

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} DocAppoint. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Made with by Md Naimur Rahman
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
