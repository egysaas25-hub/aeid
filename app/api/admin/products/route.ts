import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, forbidden } from '@/lib/api-helpers'
import { requireAdmin } from '@/lib/auth-utils'
import { createProductSchema } from '@/lib/validations'

// POST /api/admin/products - Create product (admin only)
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const validatedData = createProductSchema.parse(body)

        const product = await prisma.product.create({
            data: validatedData,
            include: {
                category: true,
            },
        })

        return successResponse(product, 201)
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}

// GET /api/admin/products - List all products (admin only, no filters)
export async function GET(request: NextRequest) {
    try {
        await requireAdmin()

        const products = await prisma.product.findMany({
            include: {
                category: true,
                _count: {
                    select: {
                        orderItems: true,
                        cartItems: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return successResponse(products)
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}
