'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface Order {
    id: string
    orderNumber: string
    total: string
    status: string
    createdAt: string
    items: any[]
}

export default function OrdersPage() {
    const { data: session } = useSession()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session) {
            fetchOrders()
        }
    }, [session])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders')
            if (res.ok) {
                const data = await res.json()
                setOrders(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            PENDING: 'bg-yellow-500',
            PROCESSING: 'bg-blue-500',
            SHIPPED: 'bg-purple-500',
            DELIVERED: 'bg-green-500',
            CANCELLED: 'bg-red-500',
        }
        return colors[status] || 'bg-gray-500'
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
            <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">View and track your orders</p>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground mb-4">No orders yet</p>
                        <Link href="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>Order #{order.orderNumber}</CardTitle>
                                        <CardDescription>
                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {order.items.length} item(s)
                                        </span>
                                        <span className="font-semibold">
                                            ${Number(order.total).toFixed(2)}
                                        </span>
                                    </div>
                                    <Link href={`/account/orders/${order.id}`}>
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
