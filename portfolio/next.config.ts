import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    "**/*": ["prisma/**/*"],
  },
  serverExternalPackages: ["pg", "pg-cloudflare"],
};

export default nextConfig;
