import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    "**/*": ["prisma/**/*"],
  },
  serverExternalPackages: ["pg", "pg-cloudflare", "openai"],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'quantummindai.vercel.app',
          },
        ],
        destination: 'https://qmai.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'quantummindai-*-gadiparthipoojiths-projects.vercel.app',
          },
        ],
        destination: 'https://qmai.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
