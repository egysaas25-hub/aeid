import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError } from '@/lib/api-helpers'

// GET /api/categories - List all categories
export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { name: 'asc' },
        })

        return successResponse(categories)
    } catch (error) {
        return handleApiError(error)
    }
}
