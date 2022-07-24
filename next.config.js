/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "picsum.photos",
      "backmarket.de",
      "lestore-uploads.s3.eu-central-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
