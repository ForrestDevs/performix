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
        pathname: '/**',
      },
      {
        hostname: 'performix.ca',
        protocol: 'https',
        pathname: '/**',
      },
      {
        hostname: 'www.performix.ca',
        protocol: 'https',
        pathname: '/**',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        pathname: '/**',
      },
      {
        hostname: 'image.mux.com',
        protocol: 'https',
        pathname: '/**',
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
