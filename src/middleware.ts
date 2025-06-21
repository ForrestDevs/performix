import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { betterFetch } from '@better-fetch/fetch'
import type { Session } from './lib/auth/types'

// Define protected routes that require authentication
const PROTECTED_ROUTES = ['/student']
// Define routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/sign-in', '/get-started']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
    },
  })
  //   const token = request.cookies.get('payload-token')?.value

  // Check if the route is protected and user is not authenticated
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.includes(pathname) && session && (session.user as any).role !== 'admin') {
    return NextResponse.redirect(new URL('/student', request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all protected routes
    '/student/:path*',
    // Match auth routes
    '/sign-in',
    '/get-started',
  ],
}
