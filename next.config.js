/**
 * Next.js Configuration for Jacco's Portfolio
 * @description Configuration file for Next.js with Cloudflare Pages compatibility
 * @version 3.0.2
 * @author Jacco
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Changed from 'standalone' to 'export' for Cloudflare Pages compatibility
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Next.js 14+ has App Router enabled by default
  // No need for experimental config
  // Disable trailing slashes for Cloudflare Pages
  trailingSlash: false,
};

module.exports = nextConfig;
