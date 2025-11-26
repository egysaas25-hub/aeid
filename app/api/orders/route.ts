import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { successResponse, handleApiError, unauthorized, errorResponse } from '@/lib/api-helpers'
import { getCurrentUser } from '@/lib/auth-utils'
import { createOrderSchema } from '@/lib/validations'

// GET /api/orders - Get user's orders
export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const orders = await prisma.order.findMany({
            where: { userId: currentUser.id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                shippingAddress: true,
                billingAddress: true,
            },
            orderBy: { createdAt: 'desc' },
        })

        return successResponse(orders)
    } catch (error) {
        return handleApiError(error)
    }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return unauthorized()
        }

        const body = await request.json()
        const validatedData = createOrderSchema.parse(body)

        // Verify addresses belong to user
        const [shippingAddr, billingAddr] = await Promise.all([
            prisma.address.findFirst({
                where: { id: validatedData.shippingAddressId, userId: currentUser.id },
            }),
            prisma.address.findFirst({
                where: { id: validatedData.billingAddressId, userId: currentUser.id },
            }),
        ])

        if (!shippingAddr || !billingAddr) {
            return errorResponse('Invalid address', 400)
        }

        // Fetch products and validate stock
        const productIds = validatedData.items.map((item) => item.productId)
        const products = await prisma.product.findMany({
            where: { id: { in: productIds }, isActive: true },
        })

        if (products.length !== productIds.length) {
            return errorResponse('Some products are not available', 400)
        }

        // Calculate pricing
        let subtotal = 0
        const orderItems: any[] = []

        for (const item of validatedData.items) {
            const product = products.find((p: typeof products[0]) => p.id === item.productId)
            if (!product) continue

            // Check stock
            if (product.stock < item.quantity) {
                return errorResponse(`Insufficient stock for ${product.name}`, 400)
            }

            const itemPrice = Number(product.price)
            subtotal += itemPrice * item.quantity

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
                setType: item.setType,
            })
        }

        // Simple calculations (customize as needed)
        const tax = subtotal * 0.1 // 10% tax
        const shipping = subtotal > 1000 ? 0 : 50 // Free shipping over $1000
        const total = subtotal + tax + shipping

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

        // Create order
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const order = await prisma.$transaction(async (tx: any) => {
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    userId: currentUser.id,
                    orderNumber,
                    shippingAddressId: validatedData.shippingAddressId,
                    billingAddressId: validatedData.billingAddressId,
                    subtotal,
                    tax,
                    shipping,
                    total,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                    notes: validatedData.notes,
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                    shippingAddress: true,
                    billingAddress: true,
                },
            })

            // Update product stock
            for (const item of validatedData.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                })
            }

            // Clear user's cart
            await tx.cartItem.deleteMany({
                where: { userId: currentUser.id },
            })

            return newOrder
        })

        return successResponse(order, 201)
    } catch (error) {
        return handleApiError(error)
    }
}
