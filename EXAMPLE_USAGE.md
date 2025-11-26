# 🎯 Practical Examples - Using Supabase in Your App

## Quick Start

Your Supabase client is already set up in `lib/supabase.ts`. Just import and use it!

```typescript
import { supabase } from '@/lib/supabase'
```

## 📝 Real-World Examples for Your E-commerce App

### 1. Products Page

```typescript
// app/products/page.tsx
import { supabase } from '@/lib/supabase'
import { ProductCard } from '@/components/product-card'

export default async function ProductsPage() {
  // Fetch products with category
  const { data: products, error } = await supabase
    .from('Product')
    .select(`
      *,
      category:Category(name, slug)
    `)
    .eq('isActive', true)
    .order('createdAt', { ascending: false })
  
  if (error) {
    return <div>Error loading products: {error.message}</div>
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### 2. Product Detail Page

```typescript
// app/product/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { data: product } = await supabase
    .from('Product')
    .select(`
      *,
      category:Category(*)
    `)
    .eq('slug', params.slug)
    .single()
  
  if (!product) {
    notFound()
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-2xl font-bold">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category.name}</p>
      
      {product.images.map((img, i) => (
        <img key={i} src={img} alt={product.name} />
      ))}
    </div>
  )
}
```

### 3. Add to Cart API

```typescript
// app/api/cart/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId, productId, quantity, setType } = await request.json()
  
  // Check if item already in cart
  const { data: existing } = await supabase
    .from('CartItem')
    .select('*')
    .eq('userId', userId)
    .eq('productId', productId)
    .eq('setType', setType)
    .single()
  
  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('CartItem')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single()
    
    return NextResponse.json(data)
  }
  
  // Add new item
  const { data, error } = await supabase
    .from('CartItem')
    .insert({ userId, productId, quantity, setType })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  
  return NextResponse.json(data)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  const { data: cartItems, error } = await supabase
    .from('CartItem')
    .select(`
      *,
      product:Product(
        *,
        category:Category(*)
      )
    `)
    .eq('userId', userId)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(cartItems)
}
```

### 4. User Registration

```typescript
// app/api/auth/register/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password, name } = await request.json()
  
  // Check if user exists
  const { data: existing } = await supabase
    .from('User')
    .select('id')
    .eq('email', email)
    .single()
  
  if (existing) {
    return NextResponse.json(
      { error: 'Email already registered' },
      { status: 400 }
    )
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create user
  const { data: user, error } = await supabase
    .from('User')
    .insert({
      email,
      password: hashedPassword,
      name,
      role: 'CUSTOMER'
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } })
}
```

### 5. Create Order

```typescript
// app/api/orders/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId, items, shippingAddressId, billingAddressId } = await request.json()
  
  // Calculate totals
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = 10.00
  const total = subtotal + tax + shipping
  
  // Generate order number
  const orderNumber = `ORD-${Date.now()}`
  
  // Create order
  const { data: order, error: orderError } = await supabase
    .from('Order')
    .insert({
      userId,
      orderNumber,
      subtotal,
      tax,
      shipping,
      total,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      shippingAddressId,
      billingAddressId
    })
    .select()
    .single()
  
  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }
  
  // Create order items
  const orderItems = items.map((item: any) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    setType: item.setType
  }))
  
  const { error: itemsError } = await supabase
    .from('OrderItem')
    .insert(orderItems)
  
  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }
  
  // Clear cart
  await supabase
    .from('CartItem')
    .delete()
    .eq('userId', userId)
  
  return NextResponse.json(order)
}
```

### 6. Admin Dashboard - Get Stats

```typescript
// app/admin/dashboard/page.tsx
import { supabase } from '@/lib/supabase'

export default async function AdminDashboard() {
  // Get counts
  const [
    { count: totalUsers },
    { count: totalProducts },
    { count: totalOrders },
    { data: recentOrders }
  ] = await Promise.all([
    supabase.from('User').select('*', { count: 'exact', head: true }),
    supabase.from('Product').select('*', { count: 'exact', head: true }),
    supabase.from('Order').select('*', { count: 'exact', head: true }),
    supabase
      .from('Order')
      .select(`
        *,
        user:User(name, email)
      `)
      .order('createdAt', { ascending: false })
      .limit(10)
  ])
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3>Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3>Total Products</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3>Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.user.name}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### 7. Search Products

```typescript
// app/api/products/search/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  
  let queryBuilder = supabase
    .from('Product')
    .select(`
      *,
      category:Category(*)
    `)
    .eq('isActive', true)
  
  // Search by name or description
  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
  }
  
  // Filter by category
  if (category) {
    queryBuilder = queryBuilder.eq('categoryId', category)
  }
  
  const { data: products, error } = await queryBuilder
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(products)
}
```

## 🎨 Client Component Example

```typescript
'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

export function CartButton({ userId }: { userId: string }) {
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    loadCartCount()
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('cart-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'CartItem',
          filter: `userId=eq.${userId}`
        },
        () => {
          loadCartCount()
        }
      )
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [userId])
  
  async function loadCartCount() {
    const { count } = await supabase
      .from('CartItem')
      .select('*', { count: 'exact', head: true })
      .eq('userId', userId)
    
    setCartCount(count || 0)
  }
  
  return (
    <button className="relative">
      🛒
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  )
}
```

## 🚀 That's It!

You now have everything you need to use Supabase in your app. The syntax is straightforward:

```typescript
const { data, error } = await supabase
  .from('TableName')
  .select('*')
  .eq('column', 'value')
```

Start building! 🎉
