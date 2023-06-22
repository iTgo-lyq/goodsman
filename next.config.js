const IS_PROD = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  //  assetPrefix: IS_PROD ? 'https://cdn.mydomain.com' : undefined,
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    serverActions: true,
    turbo: {
      resolveAlias: {
        "@arco-design/web-react": "../arco-design",
      },
    },
  },
};

module.exports = nextConfig;
