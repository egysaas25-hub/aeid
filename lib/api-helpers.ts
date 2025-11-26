import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export function successResponse<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status = 400, errors?: any) {
    return NextResponse.json(
        {
            success: false,
            error: message,
            ...(errors && { errors }),
        },
        { status }
    )
}

export function handleApiError(error: unknown) {
    console.error('API Error:', error)

    if (error instanceof ZodError) {
        return errorResponse('Validation error', 400, error.errors)
    }

    if (error instanceof Error) {
        return errorResponse(error.message, 500)
    }

    return errorResponse('Internal server error', 500)
}

export function unauthorized(message = 'Unauthorized') {
    return errorResponse(message, 401)
}

export function forbidden(message = 'Forbidden') {
    return errorResponse(message, 403)
}

export function notFound(message = 'Resource not found') {
    return errorResponse(message, 404)
}
