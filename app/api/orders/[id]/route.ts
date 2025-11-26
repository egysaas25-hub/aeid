import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, notFound } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'

// GET /api/orders/[id] - Get order details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const { id } = await params
        const order = await prisma.order.findFirst({
            where: {
                id,
                userId: currentUser.id,
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
                shippingAddress: true,
                billingAddress: true,
            },
        })

        if (!order) {
            return notFound('Order not found')
        }

        return successResponse(order)
    } catch (error) {
        return handleApiError(error)
    }
}
