"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"
import type { Product } from "@/lib/products"

type QuickAddDialogProps = {
  product: Product
}

export function QuickAddDialog({ product }: QuickAddDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      quantity,
      setType: "single",
      image: product.image,
    })
    
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setOpen(false)
      // Reset to defaults
      setSelectedSize(product.sizes[0])
      setQuantity(1)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Quick Add
        </Button>
      </DialogTrigger>
      <DialogContent className="papyrus-texture sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Preview */}
          <div className="flex gap-4">
            <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-balance">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="mt-1 text-lg font-bold text-secondary">${product.price}</p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className="flex h-10 w-14 cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <Label htmlFor="quantity" className="text-base font-semibold">
              Quantity
            </Label>
            <Select value={quantity.toString()} onValueChange={(val) => setQuantity(Number(val))}>
              <SelectTrigger id="quantity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart} 
            className="w-full gap-2" 
            size="lg"
            disabled={added}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(0)}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
