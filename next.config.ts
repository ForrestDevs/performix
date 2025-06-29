import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        hostname: 'performix.ca',
        protocol: 'https',
      },
      {
        hostname: 'www.performix.ca',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right',
  },
  experimental: {
    serverMinification: false,
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
