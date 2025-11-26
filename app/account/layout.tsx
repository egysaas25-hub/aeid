'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, MapPin, User } from 'lucide-react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const navItems = [
        { href: '/account/orders', label: 'Orders', icon: Package },
        { href: '/account/addresses', label: 'Addresses', icon: MapPin },
        { href: '/account/profile', label: 'Profile', icon: User },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
                    {/* Sidebar */}
                    <aside className="space-y-2">
                        <h2 className="text-lg font-semibold mb-4">My Account</h2>
                        <nav className="flex flex-col space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                                                ? 'bg-accent text-accent-foreground'
                                                : 'hover:bg-muted'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    {/* Content */}
                    <div>{children}</div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
