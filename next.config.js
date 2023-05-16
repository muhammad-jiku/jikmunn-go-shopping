/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // development
    // appDir: false, // production
  },
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**images.unsplash.com',
    //   },
    // ],
  },
};
module.exports = nextConfig;
