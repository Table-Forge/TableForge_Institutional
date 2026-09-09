import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        hostname: "tableforge-bucket.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
