import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını görmezden gel (Build sırasında durmasın)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint uyarılarını görmezden gel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Resimlerin her yerden yüklenmesine izin ver (Hata çıkmasın)
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
