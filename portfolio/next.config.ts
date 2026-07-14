import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    "**/*": ["prisma/**/*"],
  },
};

export default nextConfig;
