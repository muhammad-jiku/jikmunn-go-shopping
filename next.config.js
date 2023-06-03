/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true, // development
		// appDir: false, // production
	},
	// env: {
	// 	BASE_URL: `${process.env.BASE_URL}`,
	// 	DB_URI: `${process.env.DB_URI}`,
	// 	NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
	// 	NEXTAUTH_SECRET: `${process.env.NEXTAUTH_SECRET}`,
	// 	CLOUDINARY_NAME: `${process.env.CLOUDINARY_NAME}`,
	// 	CLOUDINARY_API_KEY: `${process.env.CLOUDINARY_API_KEY}`,
	// 	CLOUDINARY_API_SECRET: `${process.env.CLOUDINARY_API_SECRET}`,
	// 	CLOUDINARY_API_URL: `${process.env.CLOUDINARY_API_URL}`,
	// },
	reactStrictMode: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: '**res.cloudinary.com',
			},
		],
	},
};

module.exports = nextConfig;
