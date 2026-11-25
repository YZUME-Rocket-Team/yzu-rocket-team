import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/budget",
        destination: "/journey-2026#budget",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
