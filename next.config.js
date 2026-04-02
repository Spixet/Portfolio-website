const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'canvas', 'jsdom']
    return config
  }
};

module.exports = withBundleAnalyzer(nextConfig) // Wrap config
