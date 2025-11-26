import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'

// GET /api/user/profile - Get current user profile
export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const user = await prisma.user.findUnique({
            where: { id: currentUser.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                image: true,
                createdAt: true,
            },
        })

        return successResponse(user)
    } catch (error) {
        return handleApiError(error)
    }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const body = await request.json()
        const { name, image } = body

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                ...(name && { name }),
                ...(image && { image }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                image: true,
            },
        })

        return successResponse(user)
    } catch (error) {
        return handleApiError(error)
    }
}
