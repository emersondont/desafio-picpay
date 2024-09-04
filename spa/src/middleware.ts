'use server'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'

export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!isAuthenticated(req)) {
    return NextResponse.redirect(
      new URL(`/login`, req.nextUrl)
    )
  }

  return NextResponse.next()
}