"use client"

import type React from "react"

import { type ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-context"
import { Separator } from "@/components/ui/separator"

export function CheckoutDialog({ children }: { children: ReactNode }) {
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Clear cart after successful order
    setTimeout(() => {
      clearCart()
      setIsSuccess(false)
    }, 3000)
  }

  if (isSuccess) {
    return (
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Order Placed Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                We'll send you a confirmation email with tracking details shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>Fill in your details to place your wholesale order</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-3 font-semibold">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground line-clamp-1">{item.name}</span>
                  <span className="font-medium">${item.price.toFixed(0)}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-accent">${totalPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business">Business/Shop Name</Label>
                <Input id="business" placeholder="Cairo Bazaar" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shipping Address</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" required placeholder="123 Main Street" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required placeholder="Cairo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="Cairo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code *</Label>
                  <Input id="zip" required placeholder="12345" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input id="country" required placeholder="Egypt" />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea id="notes" placeholder="Any specific requests or delivery instructions..." className="min-h-20" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => {}}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            By placing this order, you agree to our terms and conditions. We'll contact you within 24 hours to confirm
            payment details and shipping arrangements.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
