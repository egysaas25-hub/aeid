'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Product {
    id: string
    name: string
    price: string
    stock: number
    isActive: boolean
    images: string[]
    category: {
        name: string
    }
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products')
            if (res.ok) {
                const data = await res.json()
                setProducts(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to deactivate this product?')) return

        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Product deactivated')
                fetchProducts()
            } else {
                toast.error('Failed to deactivate product')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Products Management</h2>
                    <p className="text-muted-foreground">Manage your product catalog</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    Use the existing shop to view products. Creating new products requires database access.
                </p>
            </div>

            {products.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground mb-4">
                            No products found. Connect database and run seed script.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                            <div className="aspect-square relative bg-muted">
                                {product.images[0] && (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {product.category.name}
                                        </p>
                                    </div>
                                    {product.isActive ? (
                                        <Badge className="bg-green-500">Active</Badge>
                                    ) : (
                                        <Badge variant="secondary">Inactive</Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">${Number(product.price).toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Stock: {product.stock}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
