/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // development
    // appDir: false, // production
  },
  env: {
    BASE_URL: `${process.env.BASE_URL}`,
    DB_URI: `${process.env.DB_URI}`,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**res.cloudinary.com',
      },
    ],
  },
};
module.exports = nextConfig;
