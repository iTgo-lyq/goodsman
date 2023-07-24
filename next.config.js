const IS_PROD = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  //  assetPrefix: IS_PROD ? 'https://cdn.mydomain.com' : undefined,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  },
};

module.exports = nextConfig;
