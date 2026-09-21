import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "",
    NEXT_PUBLIC_ENV:
      process.env.NEXT_PUBLIC_ENV || process.env.VITE_ENV || "",
    NEXT_PUBLIC_GEOAPIFY_API_KEY:
      process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY ||
      process.env.VITE_GEOAPIFY_API_KEY ||
      "",
    VITE_API_URL:
      process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "",
    VITE_ENV:
      process.env.NEXT_PUBLIC_ENV || process.env.VITE_ENV || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tableforge.com.br",
      },
      {
        protocol: "https",
        hostname: "table-forge.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
