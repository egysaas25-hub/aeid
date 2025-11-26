import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function getSession() {
    return await auth()
}

export async function getCurrentUser() {
    const session = await getSession()
    return session?.user
}

export async function requireAuth() {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error('Unauthorized')
    }
    return user
}

export async function requireAdmin() {
    const user = await requireAuth()
    if (user.role !== 'ADMIN') {
        throw new Error('Forbidden: Admin access required')
    }
    return user
}

// Middleware helper to check authentication in API routes
export async function withAuth(
    handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            const user = await requireAuth()
            return await handler(req, user)
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }
    }
}

// Middleware helper to check admin role in API routes
export async function withAdmin(
    handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            const user = await requireAdmin()
            return await handler(req, user)
        } catch (error) {
            const status = error instanceof Error && error.message.includes('Forbidden') ? 403 : 401
            return NextResponse.json(
                { success: false, error: error instanceof Error ? error.message : 'Unauthorized' },
                { status }
            )
        }
    }
}
