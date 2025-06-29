declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string
      PAYLOAD_SECRET: string
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_BETTER_AUTH_URL: string
      CRON_SECRET: string
      PREVIEW_SECRET: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      BLOB_READ_WRITE_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PAYLOAD_PUBLIC_SERVER_URL: string
      BETTER_AUTH_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      EMAIL_HOST: string
      EMAIL_PORT: string
      EMAIL_USER: string
      EMAIL_PASSWORD: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
