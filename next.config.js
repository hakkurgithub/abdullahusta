/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOT: output: "export" satırı BURADA YOK. 
  // Bu sayede Vercel sunucu özelliklerini (API, Veritabanı) kullanabilir.
  
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

module.exports = nextConfig;
