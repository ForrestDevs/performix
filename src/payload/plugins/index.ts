import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Page } from '@/payload-types'
import { getServerSideURL } from '@/lib/utilities/getURL'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { stripe } from '@better-auth/stripe'
import { BetterAuthOptions, betterAuthPlugin } from 'payload-auth/better-auth'
import { admin, BetterAuthPlugin } from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'
import { emailHarmony } from 'better-auth-harmony'
import { nextCookies } from 'better-auth/next-js'
import { allowedOrigins } from '@/payload/allowed-origins'
import { renderVerificationEmail } from '@/lib/email/templates/verification-email'
import { stripeClient } from '@/lib/stripe'
import { handleWebhooks } from '@/lib/stripe/handle-webhooks'
// import { handleWebhooks } from '@/lib/stripe/handle-webhooks'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const betterAuthPlugins: BetterAuthPlugin[] = [
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
  stripe({
    stripeClient,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    createCustomerOnSignUp: true,
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
        await fetch('/api/email/send', {
          method: 'POST',
          body: JSON.stringify({
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
          }),
        })
        // await sendEmail({
        //   to: process.env.NODE_ENV === 'development' ? 'luke.gannon@me.com' : user.email,
        //   subject: 'Reset Your Performix Password',
        //   html: `
        //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        //       <h1 style="color: #0891B2;">Reset Your Performix Password</h1>
        //       <p>Hi ${user.name || 'Player'},</p>
        //       <p>You requested to reset your password. Click the button below to create a new password:</p>
        //       <div style="text-align: center; margin: 32px 0;">
        //         <a href="${url}" style="background-color: #0891B2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        //           Reset Password
        //         </a>
        //       </div>
        //       <p>If you didn't request this, please ignore this email.</p>
        //       <p>This link will expire in 24 hours.</p>
        //     </div>
        //   `,
        //   text: `Reset your Performix password by visiting: ${url}`,
        // })
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
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email/send`, {
          method: 'POST',
          body: JSON.stringify({
            to: process.env.NODE_ENV === 'development' ? 'luke.gannon@me.com' : user.email,
            subject: 'Verify Your Performix Account - Start Your Journey!',
            html: emailHtml,
            text: `Welcome to Performix! Please verify your email address by visiting: ${url}`,
          }),
        })
        // await sendEmail({
        //   to: process.env.NODE_ENV === 'development' ? 'luke.gannon@me.com' : user.email,
        //   subject: 'Verify Your Performix Account - Start Your Journey!',
        //   html: emailHtml,
        //   text: `Welcome to Performix! Please verify your email address by visiting: ${url}`,
        // })
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
      maxAge: 60 * 60, // Cache duration in seconds (1 hour instead of 5 minutes)
    },
    updateAge: 60 * 60 * 24, // Only update session once per day
    disableSessionRefresh: false, // Keep session refresh enabled but less frequent
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
        fields: collection.fields.map((field) => {
          if ((field as any).name === 'stripeCustomerId') {
            return {
              ...field,
              saveToJWT: true,
            } as any
          }
          return field
        }),
      }),
    },
    betterAuthOptions: betterAuthOptions,
  }),
  stripePlugin({
    logs: true,
    isTestKey: process.env.NODE_ENV === 'development',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
    webhooks: async ({ event, stripe, config, payload, req }) => {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe`, {
        method: 'POST',
        body: JSON.stringify({ event }),
      })

      // await handleWebhooks(event, stripe, config, payload, req)
    },
  }),
]
