import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Page } from '@/payload-types'
import { getServerSideURL } from '@/lib/utilities/getURL'
import { BetterAuthOptions, betterAuthPlugin } from 'payload-auth/better-auth'
import {
  admin,
  anonymous,
  apiKey,
  emailOTP,
  magicLink,
  multiSession,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
  username,
} from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'
import { emailHarmony } from 'better-auth-harmony'
import { nextCookies } from 'better-auth/next-js'
import { allowedOrigins } from '@/payload/allowed-origins'
import { sendEmail } from '@/lib/data/email'
import { renderVerificationEmail } from '@/lib/email/templates/verification-email'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const betterAuthPlugins = [
  emailHarmony(),
  passkey({
    rpID: 'payload-better-auth',
    rpName: 'payload-better-auth-demo',
    origin: 'http://localhost:3000',
  }),
  admin({
    defaultRole: 'student',
    adminRoles: ['admin'],
  }),
  nextCookies(),
]

export type BetterAuthPlugins = typeof betterAuthPlugins

export const betterAuthOptions: BetterAuthOptions = {
  appName: 'payload-better-auth',
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: allowedOrigins,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 4,
    async sendResetPassword({ user, url }) {
      console.log('Send reset password for user: ', user.id, 'at url', url)

      try {
        await sendEmail({
          to: process.env.NODE_ENV === 'development' ? 'luke.gannon@me.com' : user.email,
          subject: 'Reset Your Performix Password',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0891B2;">Reset Your Performix Password</h1>
              <p>Hi ${user.name || 'Player'},</p>
              <p>You requested to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${url}" style="background-color: #0891B2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Reset Password
                </a>
              </div>
              <p>If you didn't request this, please ignore this email.</p>
              <p>This link will expire in 24 hours.</p>
            </div>
          `,
          text: `Reset your Performix password by visiting: ${url}`,
        })
        console.log('Password reset email sent successfully to:', user.email)
      } catch (error) {
        console.error('Failed to send password reset email:', error)
        throw new Error('Failed to send password reset email')
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log('Send verification email for user TT: ', url)

      const emailHtml = renderVerificationEmail({
        name: user.name || 'Player',
        verificationUrl: url,
      })

      try {
        await sendEmail({
          to: process.env.NODE_ENV === 'development' ? 'luke.gannon@me.com' : user.email,
          subject: 'Verify Your Performix Account - Start Your Journey!',
          html: emailHtml,
          text: `Welcome to Performix! Please verify your email address by visiting: ${url}`,
        })
        console.log('Verification email sent successfully to:', user.email)
      } catch (error) {
        console.error('Failed to send verification email:', error)
        throw new Error('Failed to send verification email')
      }
    },
  },
  plugins: betterAuthPlugins,
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        console.log('Send change email verification for user: ', user, newEmail, url, token)
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        // Send delete account verification
      },
      beforeDelete: async (user) => {
        // Perform actions before user deletion
      },
      afterDelete: async (user) => {
        // Perform cleanup after user deletion
      },
    },
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'student',
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'email-password'],
    },
  },
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  vercelBlobStorage({
    collections: {
      ['media']: {
        prefix: 'performix/',
      },
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
  betterAuthPlugin({
    disableDefaultPayloadAuth: true,
    hidePluginCollections: true,
    admin: {
      loginMethods: ['google', 'emailPassword', 'passkey'],
    },
    collectionAdminGroup: 'Admin',
    users: {
      roles: ['student', 'mentor', 'admin'],
      defaultRole: 'student',
      defaultAdminRole: 'admin',
      collectionOverrides: ({ collection }) => ({
        ...collection,
        admin: {
          ...collection.admin,
          defaultColumns: ['name', 'email', 'role'],
        },
      }),
    },
    betterAuthOptions: betterAuthOptions,
  }),
]
