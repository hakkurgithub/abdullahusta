import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // BU SATIRI KALDIRDIK (Dinamik özellikler için gerekli)
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
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
