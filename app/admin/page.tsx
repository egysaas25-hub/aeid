'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react'

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Total Orders',
            value: '0',
            icon: ShoppingCart,
            description: 'All time orders',
        },
        {
            title: 'Total Products',
            value: '3',
            icon: Package,
            description: 'Active products',
        },
        {
            title: 'Total Revenue',
            value: '$0',
            icon: DollarSign,
            description: 'All time revenue',
        },
        {
            title: 'Total Customers',
            value: '0',
            icon: Users,
            description: 'Registered users',
        },
    ]

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Use the sidebar to manage products, orders, and view analytics.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
