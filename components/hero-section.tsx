"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden papyrus-texture py-20 md:py-32 border-y-4 border-secondary"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-balance text-primary sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
              Pharaoh Prints Apparel
            </h1>
            <p className="text-lg text-foreground text-pretty md:text-xl leading-relaxed">
              Elevate Your Bazaar or Shop with Exclusive Egyptian-Themed Designs – Wholesale Deals Starting at 700 per
              Piece!
            </p>
            <p className="text-base text-muted-foreground text-pretty leading-relaxed">
              Special paintings on premium fabric. Mix & match: Quarter set (3 pcs – 10% off), Half set (6 pcs – 15%
              off), Full set (12 pcs – 20% off).
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop">
                <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Pricing
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-2xl border-4 border-secondary">
              <img
                src="/egyptian-tutankhamun-dress-with-gold-mask-print-on.jpg"
                alt="Egyptian-themed dress"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
