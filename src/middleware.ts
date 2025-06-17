import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for protected routes
  if (pathname.startsWith('/consumer') || pathname.startsWith('/student')) {
    const sessionCookie = getSessionCookie(request)

    // If no session cookie, redirect to sign-in
    if (!sessionCookie) {
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/consumer/:path*',
    '/student/:path*',
  ]
}