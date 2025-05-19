import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    domains: [
      "i.pravatar.cc",
      "lh3.googleusercontent.com",
      "i.imgur.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
