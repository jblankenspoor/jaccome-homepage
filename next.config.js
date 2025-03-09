/**
 * Next.js Configuration for Jacco's Portfolio
 * @description Configuration file for Next.js with Cloudflare Pages compatibility
 * @version 3.0.1
 * @author Jacco
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
