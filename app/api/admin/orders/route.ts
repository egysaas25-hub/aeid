import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, forbidden, notFound } from '@/lib/api-helpers'
import { requireAdmin } from '@/lib/auth-utils'
import { updateOrderStatusSchema } from '@/lib/validations'

// GET /api/admin/orders - List all orders (admin only)
export async function GET(request: NextRequest) {
    try {
        await requireAdmin()

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const skip = (page - 1) * limit

        const where: any = {}
        if (status) {
            where.status = status
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                        },
                    },
                    items: {
                        include: {
                            product: true,
                        },
                    },
                    shippingAddress: true,
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.order.count({ where }),
        ])

        return successResponse({
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}
