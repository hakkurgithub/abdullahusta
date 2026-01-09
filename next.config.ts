import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // BU AYARLAR ÇOK ÖNEMLİ:
  eslint: {
    ignoreDuringBuilds: true, // Lint (<<) hatalarını yoksay
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript hatalarını yoksay
  },
};

export default nextConfig;
