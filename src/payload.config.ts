import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { plugins } from './payload/plugins'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { USER_SLUG } from './payload/collections/constants'
import { collections } from './payload/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
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
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: path.resolve(dirname, 'lib/migrations'),
  }),
  collections,
  cors: [process.env.PAYLOAD_PUBLIC_SITE_URL || ''],
  csrf: [process.env.PAYLOAD_PUBLIC_SITE_URL || ''],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  onInit: async (cms) => {
    // Check for existing admin users
    const existingAdmins = await cms.find({
      collection: 'users',
      where: {
        roles: {
          contains: 'admin',
        },
      },
    })

    // If no admin users exist, create one using environment variables
    if (!existingAdmins.docs || existingAdmins.docs.length === 0) {
      try {
        await cms.create({
          collection: 'users',
          data: {
            email: 'dev@perfomix.com',
            password: 'devs',
            roles: ['admin'],
            name: 'Dev Admin',
          },
        })
        console.log('Admin user created successfully')
      } catch (err) {
        console.error('Error creating admin user:', err)
      }
    }
  },
})
