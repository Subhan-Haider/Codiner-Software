/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Compression settings
  compress: true,
  // Power optimizations
  poweredByHeader: false,
  // React strict mode
  reactStrictMode: true,
  // Enable experimental features
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}

module.exports = nextConfig
