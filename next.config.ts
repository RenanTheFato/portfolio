import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./translator/request.ts')

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95, 100]
  },
}

export default withNextIntl(nextConfig)