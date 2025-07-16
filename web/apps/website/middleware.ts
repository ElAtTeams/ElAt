// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { refreshToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Public routes
  const publicPaths = ['/login', '/register', '/forgot-password']
  if (publicPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  const protectedPaths = ['/dashboard', '/profile']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!verifyResponse.ok) throw new Error('Token invalid')

      return NextResponse.next()
    } catch (error) {
      const newToken = await refreshToken()
      if (!newToken) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('token')
        response.cookies.delete('refreshToken')
        return response
      }

      const response = NextResponse.next()
      response.cookies.set('token', newToken, {
        maxAge: 15 * 60, // 15 minutes
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}