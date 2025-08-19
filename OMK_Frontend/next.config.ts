import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Uncomment if you’re using static export
  // output: "export",

  typescript: {
    // ⚠️ Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
