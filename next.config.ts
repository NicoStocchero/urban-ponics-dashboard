import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  experimental: {
    // Enable Partial Prerendering for better performance
    ppr: true,
  },
  images: {
    // Allow Supabase images if needed
    domains: ['mwbkrkoeltsbkbguoemo.supabase.co'],
  },
}

export default withNextIntl(nextConfig)
