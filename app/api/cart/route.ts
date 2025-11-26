import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, notFound, errorResponse } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'
import { addToCartSchema, updateCartItemSchema } from '@/lib/validations'

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId: currentUser.id },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        const totalItems = cartItems.reduce((sum: number, item) => sum + item.quantity, 0)
        const totalPrice = cartItems.reduce(
            (sum: number, item) => sum + Number(item.product.price) * item.quantity,
            0
        )

        return successResponse({
            items: cartItems,
            totalItems,
            totalPrice,
        })
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const body = await request.json()
        const validatedData = addToCartSchema.parse(body)

        // Check if product exists and is active
        const product = await prisma.product.findUnique({
            where: { id: validatedData.productId },
        })

        if (!product || !product.isActive) {
            return notFound('Product not found or not available')
        }

        // Check stock
        if (product.stock < validatedData.quantity) {
            return errorResponse('Insufficient stock', 400)
        }

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId_setType: {
                    userId: currentUser.id,
                    productId: validatedData.productId,
                    setType: validatedData.setType,
                },
            },
        })

        let cartItem

        if (existingItem) {
            // Update quantity
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + validatedData.quantity,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            })
        } else {
            // Create new cart item
            cartItem = await prisma.cartItem.create({
                data: {
                    userId: currentUser.id,
                    productId: validatedData.productId,
                    quantity: validatedData.quantity,
                    setType: validatedData.setType,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            })
        }

        return successResponse(cartItem, 201)
    } catch (error) {
        return handleApiError(error)
    }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        await prisma.cartItem.deleteMany({
            where: { userId: currentUser.id },
        })

        return successResponse({ message: 'Cart cleared successfully' })
    } catch (error) {
        return handleApiError(error)
    }
}
