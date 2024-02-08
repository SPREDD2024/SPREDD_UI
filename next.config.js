/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    async rewrites() {
      return [
        { source: '/api/predict/:path*', destination: '/api/proxy.js' },
        { source: '/api/history/:path*', destination: '/api/proxy.js' },
      ];
    },
  };
