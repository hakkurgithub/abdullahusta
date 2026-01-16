import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını görmezden gel (Build sırasında)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint uyarılarını görmezden gel (Build sırasında)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Resim optimizasyonu için izin verilen domainler
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
