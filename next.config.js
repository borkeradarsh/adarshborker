// next.config.js - Safe production-ready configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  // swcMinify is enabled by default in Next.js 15
  productionBrowserSourceMaps: false, // reduce payload
  experimental: {
    // disable unstable package import optimization that caused regressions
    optimizePackageImports: undefined,
    // you may keep optimizeCss if you want; enabling it is optional
    // optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Enable modern image formats and optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    qualities: [50, 70, 75, 80, 85, 90, 95, 100], // Configure allowed quality values
  },
  // Enable compression and caching
  compress: true,
  poweredByHeader: false,
  // long-term caching for static assets (applies when deployed)
  async headers() {
    return [
      {
        source: '/:all*.(jpg|jpeg|png|webp|avif|svg|ico|css|js|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ]
  },
};

module.exports = withBundleAnalyzer(nextConfig);