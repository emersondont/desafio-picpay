import type { NextRequest } from 'next/server'
import { getAccessToken, getUserType } from './cookies'

const protectedRoutes = ["/"]

export const isAuthenticated = (request: NextRequest) => {
  const token = getAccessToken()

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token?.value) {
    return false
  }

  return true
}

export const isPageRestrictedForUser = (request: NextRequest) => {
  const userType = getUserType()

  if(request.nextUrl.pathname === "/transfer" && userType?.value === "MERCHANT") { 
    return true
  }

  return false
}