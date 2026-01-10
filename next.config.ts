import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" satırını tamamen kaldırdık.
  // Artık Vercel, dinamik API rotalarımızı (Login, Admin vb.) çalıştırabilir.
  
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
