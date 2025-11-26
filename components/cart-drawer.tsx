"use client"

import type { ReactNode } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Trash2, ShoppingBag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CheckoutDialog } from "@/components/checkout-dialog"

export function CartDrawer({ children }: { children: ReactNode }) {
  const { items, removeFromCart, totalPrice, totalItems } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg papyrus-cart">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add products to get started</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id, item.setType)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold">${item.price.toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">${totalPrice.toFixed(0)}</span>
                </div>
              </div>

              <CheckoutDialog>
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </CheckoutDialog>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
