import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, forbidden, notFound } from '@/lib/api-helpers'
import { requireAdmin } from '@/lib/auth-utils'
import { updateProductSchema } from '@/lib/validations'

// PUT /api/admin/products/[id] - Update product (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        const body = await request.json()
        const validatedData = updateProductSchema.parse(body)

        const product = await prisma.product.update({
            where: { id },
            data: validatedData,
            include: {
                category: true,
            },
        })

        return successResponse(product)
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}

// DELETE /api/admin/products/[id] - Delete product (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id },
        })

        if (!product) {
            return notFound('Product not found')
        }

        // Soft delete by setting isActive to false
        await prisma.product.update({
            where: { id },
            data: { isActive: false },
        })

        return successResponse({ message: 'Product deactivated successfully' })
    } catch (error) {
        if (error instanceof Error && error.message.includes('Forbidden')) {
            return forbidden(error.message)
        }
        return handleApiError(error)
    }
}
