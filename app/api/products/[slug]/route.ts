import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, notFound, handleApiError } from '@/lib/api-helpers'

// GET /api/products/[slug] - Get single product by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        })

        if (!product) {
            return notFound('Product not found')
        }

        return successResponse(product)
    } catch (error) {
        return handleApiError(error)
    }
}
