/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOT: 'output: export' BURADA YOK!
  // Bu sayede Admin paneli ve veritabanı çalışabilir.
  
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
