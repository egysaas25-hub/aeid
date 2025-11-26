import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ratelimit } from '@/lib/ratelimit'

export async function middleware(request: NextRequest) {
    // Rate Limiting
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
        const { success } = await ratelimit.limit(ip)

        if (!success) {
            return new NextResponse('Too Many Requests', { status: 429 })
        }
    }

    const token = await getToken({ req: request })

    if (!token) {
        const url = new URL('/login', request.url)
        url.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/account/:path*",
        "/admin/:path*",
    ],
}
