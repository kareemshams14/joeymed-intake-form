/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['joey-med.square.site', 'img.icons8.com'],
  },
  // Enable production source maps for better debugging if needed
  productionBrowserSourceMaps: false,
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
