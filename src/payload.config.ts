import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { plugins } from './payload/plugins'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { USER_SLUG } from './payload/collections/constants'
import { collections } from './payload/collections'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { allowedOrigins, serverURL } from './payload/allowed-origins'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { muxWebhooksHandler } from './payload/endpoints/mux-webhook'
import { createMuxUploadHandler, getMuxUploadHandler } from './payload/endpoints/mux-upload'
import mux from './lib/mux'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const emailAdapter = () => {
  if (process.env.NODE_ENV === 'development') {
    return () => ({
      name: 'dev',
      defaultFromAddress: 'hello@performix.ca',
      defaultFromName: 'Performix',
      sendEmail: async (message) => {
        console.log('Sending email', message)
      },
    })
  }
  return nodemailerAdapter({
    skipVerify: true,
    defaultFromAddress: 'hello@performix.ca',
    defaultFromName: 'Performix',
    transportOptions: {
      host: process.env.EMAIL_HOST || '',
      port: Number(process.env.EMAIL_PORT) || 587,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    },
  })
}

export default buildConfig({
  serverURL: serverURL,
  admin: {
    meta: {
      applicationName: 'Performix',
      icons: [
        {
          url: '/favicon.ico',
          sizes: '32x32',
          type: 'image/x-icon',
        },
      ],
      titleSuffix: '- Performix',
    },
    user: USER_SLUG,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  email: emailAdapter(),
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false,
    migrationDir: path.resolve(dirname, 'lib/migrations'),
  }),
  endpoints: [
    {
      method: 'post',
      path: '/mux/upload',
      handler: createMuxUploadHandler(mux),
    },
    {
      method: 'get',
      path: '/mux/upload',
      handler: getMuxUploadHandler(mux),
    },
    {
      path: '/mux/webhook',
      method: 'post',
      handler: muxWebhooksHandler(mux),
    },
  ],
  collections,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
