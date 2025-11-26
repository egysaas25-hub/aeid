import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, notFound } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'
import { updateCartItemSchema } from '@/lib/validations'

// PUT /api/cart/[id] - Update cart item quantity
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
        const validatedData = updateCartItemSchema.parse(body)

        // Verify cart item belongs to user
        const existingItem = await prisma.cartItem.findFirst({
            where: { id, userId: currentUser.id },
            include: { product: true },
        })

        if (!existingItem) {
            return notFound('Cart item not found')
        }

        // Check stock
        if (existingItem.product.stock < validatedData.quantity) {
            return handleApiError('Insufficient stock')
        }

        const cartItem = await prisma.cartItem.update({
            where: { id },
            data: { quantity: validatedData.quantity },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        })

        return successResponse(cartItem)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/cart/[id] - Remove item from cart
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
        // Verify cart item belongs to user
        const existingItem = await prisma.cartItem.findFirst({
            where: { id, userId: currentUser.id },
        })

        if (!existingItem) {
            return notFound('Cart item not found')
        }

        await prisma.cartItem.delete({
            where: { id },
        })

        return successResponse({ message: 'Item removed from cart' })
    } catch (error) {
        return handleApiError(error)
    }
}
