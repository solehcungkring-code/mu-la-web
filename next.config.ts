import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  outputFileTracingIncludes: {
    '/admin/**': ['./dev.db'],
    '/api/**': ['./dev.db'],
    '/**': ['./dev.db'],
  },
};

export default nextConfig;
