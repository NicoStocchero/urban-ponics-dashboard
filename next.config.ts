import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  // Enable cache components (replaces PPR in Next.js 16)
  cacheComponents: true,
  images: {
    // Use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mwbkrkoeltsbkbguoemo.supabase.co',
      },
    ],
  },
  experimental: {
    // Use system TLS certificates for Turbopack
    turbopackUseSystemTlsCerts: true,
  },
}

export default withNextIntl(nextConfig)
