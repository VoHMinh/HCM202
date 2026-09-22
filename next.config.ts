import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [{ source: '/api/backend/:path*', destination: `${process.env.GAME_API_URL || 'http://127.0.0.1:8080'}/api/:path*` }];
  },
};

export default nextConfig;
