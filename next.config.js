/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
module.exports = {
    async rewrites() {
      return [
        { source: '/api/:path*', destination: 'http://44.221.163.198/:path*' },
      ];
    },
  };
