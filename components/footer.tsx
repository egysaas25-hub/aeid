"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="text-lg font-bold tracking-tight text-accent">PHARAOH PRINTS</span>
              <p className="text-xs tracking-widest text-muted-foreground">APPAREL</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exclusive Egyptian-themed wholesale apparel for bazaars and retail shops worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground transition-colors hover:text-accent">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground transition-colors hover:text-accent">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-muted-foreground transition-colors hover:text-accent">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:orders@pharaohprints.com" className="text-muted-foreground hover:text-accent">
                  orders@pharaohprints.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-accent mt-0.5" />
                <span className="text-muted-foreground">
                  123 Commerce Street
                  <br />
                  Cairo, Egypt
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe for new designs and exclusive wholesale deals.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" type="email" className="flex-1" />
              <Button className="flex-shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2025 Pharaoh Prints Apparel. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-accent">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-accent">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
