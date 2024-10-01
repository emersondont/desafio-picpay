'use server'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { isAuthenticated, isPageRestrictedForUser } from './lib/auth'

export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!isAuthenticated(req)) {
    return NextResponse.redirect(
      new URL(`/login`, req.nextUrl)
    )
  }

  if(isPageRestrictedForUser(req)) {
    return NextResponse.redirect(
      new URL(`/`, req.nextUrl)
    )
  }

  return NextResponse.next()
}