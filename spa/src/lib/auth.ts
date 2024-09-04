import type { NextRequest } from 'next/server'
import { getAccessToken } from './cookies'

const protectedRoutes = ["/"]

export const isAuthenticated = (request: NextRequest) => {
  const token = getAccessToken()

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token?.value) {
    return false
  }

  return true
}