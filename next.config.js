/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    // Use remotePatterns to explicitly allow remote image hosts (recommended over `domains`).
    // Add other hosts here if your users or doctor images come from additional providers.
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "doc-appoint-eight.vercel.app" },
    ],
  },
};

module.exports = nextConfig;
