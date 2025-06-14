export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

export const allowedOrigins = [
  serverURL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  'https://performix.ca',
  'https://www.performix.ca',
  'https://performix.vercel.app',
].filter(Boolean)
