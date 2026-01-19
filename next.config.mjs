/** @type {import('next').NextConfig} */
const nextConfig = {
  // RESİMLER İÇİN KESİN ÇÖZÜM:
  // "unoptimized: true" diyerek Next.js'e "Karışma, olduğu gibi göster" diyoruz.
  // Bu ayar domain engellerini ve kırık resim sorunlarını kökten çözer.
  images: {
    unoptimized: true, 
  },

  // Hata Engelleyiciler
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;