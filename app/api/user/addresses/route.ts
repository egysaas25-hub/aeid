import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, notFound } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'
import { createAddressSchema } from '@/lib/validations'

// GET /api/user/addresses - Get user's addresses
export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const addresses = await prisma.address.findMany({
            where: { userId: currentUser.id },
            orderBy: { isDefault: 'desc' },
        })

        return successResponse(addresses)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/user/addresses - Create new address
export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const body = await request.json()
        const validatedData = createAddressSchema.parse(body)

        // If this is set as default, unset other defaults
        if (validatedData.isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId: currentUser.id,
                    isDefault: true,
                },
                data: { isDefault: false },
            })
        }

        const address = await prisma.address.create({
            data: {
                ...validatedData,
                userId: currentUser.id,
            },
        })

        return successResponse(address, 201)
    } catch (error) {
        return handleApiError(error)
    }
}
