import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose' 

const SECRET = new TextEncoder().encode('wowniceapp')

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  console.log("Token from cookie:", token)

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch (err) {
    console.error("JWT error:", err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/profile'],
}
