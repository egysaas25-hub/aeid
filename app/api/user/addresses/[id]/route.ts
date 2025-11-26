import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, notFound } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'
import { createAddressSchema } from '@/lib/validations'

// PUT /api/user/addresses/[id] - Update address
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = createAddressSchema.partial().parse(body)

        // Verify address belongs to user
        const existingAddress = await prisma.address.findFirst({
            where: { id, userId: currentUser.id },
        })

        if (!existingAddress) {
            return notFound('Address not found')
        }

        // If setting as default, unset other defaults
        if (validatedData.isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId: currentUser.id,
                    isDefault: true,
                    id: { not: id },
                },
                data: { isDefault: false },
            })
        }

        const address = await prisma.address.update({
            where: { id },
            data: validatedData,
        })

        return successResponse(address)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/user/addresses/[id] - Delete address
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const { id } = await params
        // Verify address belongs to user
        const existingAddress = await prisma.address.findFirst({
            where: { id, userId: currentUser.id },
        })

        if (!existingAddress) {
            return notFound('Address not found')
        }

        await prisma.address.delete({
            where: { id },
        })

        return successResponse({ message: 'Address deleted successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}
