import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, forbidden, notFound } from '@/lib/api-helpers'
import { requireAdmin } from '@/lib/auth-utils'
import { updateOrderStatusSchema } from '@/lib/validations'

// PUT /api/admin/orders/[id] - Update order status (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        const body = await request.json()
        const validatedData = updateOrderStatusSchema.parse(body)

        const order = await prisma.order.findUnique({
            where: { id },
        })

        if (!order) {
            return notFound('Order not found')
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status: validatedData.status },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                shippingAddress: true,
                billingAddress: true,
            },
        })

        return successResponse(updatedOrder)
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}
