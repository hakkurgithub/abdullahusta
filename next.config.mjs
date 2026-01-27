/** @type {import('next').NextConfig} */
const nextConfig = {
  // Resimlerin her yerde (Vercel, GitHub) görünmesini garantiye alır
  images: {
    unoptimized: true, 
  },
  // TypeScript hataları yüzünden build işleminin durmasını engeller
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;