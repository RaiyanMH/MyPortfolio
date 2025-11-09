import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure static assets are properly handled
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
