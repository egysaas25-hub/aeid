import { z } from 'zod'

// User schemas
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

// Product schemas
export const createProductSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    fullDescription: z.string().min(1, 'Full description is required'),
    price: z.number().positive('Price must be positive'),
    compareAtPrice: z.number().positive().optional(),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    categoryId: z.string().cuid('Invalid category ID'),
    colors: z.array(z.string()),
    sizes: z.array(z.string()),
    stock: z.number().int().min(0, 'Stock cannot be negative').default(0),
    isActive: z.boolean().default(true),
})

export const updateProductSchema = createProductSchema.partial()

// Cart schemas
export const addToCartSchema = z.object({
    productId: z.string().cuid('Invalid product ID'),
    quantity: z.number().int().positive('Quantity must be positive'),
    setType: z.enum(['single', 'quarter', 'half', 'full']),
})

export const updateCartItemSchema = z.object({
    quantity: z.number().int().positive('Quantity must be positive'),
})

// Address schemas
export const createAddressSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    isDefault: z.boolean().optional(),
})

// Order schemas
export const createOrderSchema = z.object({
    items: z.array(
        z.object({
            productId: z.string().cuid(),
            quantity: z.number().int().positive(),
            setType: z.enum(['single', 'quarter', 'half', 'full']),
        })
    ).min(1, 'Order must contain at least one item'),
    shippingAddressId: z.string().cuid('Invalid shipping address ID'),
    billingAddressId: z.string().cuid('Invalid billing address ID'),
    notes: z.string().optional(),
})

export const updateOrderStatusSchema = z.object({
    status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
})
