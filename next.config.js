/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVED: output: 'export' (This was causing the 404 on Vercel)
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'novusexchange.com' },
    ],
  },
  // CLEANED: Removed the deprecated eslint block causing build warnings
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
