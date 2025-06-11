declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_BETTER_AUTH_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      BLOB_READ_WRITE_TOKEN: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
