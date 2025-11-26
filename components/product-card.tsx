"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-context"
import { ShoppingCart } from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

type SetType = "single" | "quarter" | "half" | "full"

const setOptions = {
  single: { label: "Single Piece", quantity: 1, discount: 0 },
  quarter: { label: "Quarter Set (3 pcs)", quantity: 3, discount: 0.1 },
  half: { label: "Half Set (6 pcs)", quantity: 6, discount: 0.15 },
  full: { label: "Full Set (12 pcs)", quantity: 12, discount: 0.2 },
}

export function ProductCard({ product }: { product: Product }) {
  const [setType, setSetType] = useState<SetType>("single")
  const { addToCart } = useCart()

  const calculatePrice = () => {
    const option = setOptions[setType]
    const basePrice = product.price * option.quantity
    return basePrice * (1 - option.discount)
  }

  const handleAddToCart = () => {
    const option = setOptions[setType]
    addToCart({
      id: `${product.id}-${setType}`,
      name: `${product.name} (${option.label})`,
      price: calculatePrice(),
      quantity: 1,
      setType,
      image: product.image,
    })
  }

  const pricePerPiece = calculatePrice() / setOptions[setType].quantity

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">{product.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <Select value={setType} onValueChange={(value) => setSetType(value as SetType)}>
          <SelectTrigger className="mb-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(setOptions).map(([key, option]) => (
              <SelectItem key={key} value={key}>
                {option.label}
                {option.discount > 0 && ` - ${option.discount * 100}% off`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-2xl font-bold text-accent">${calculatePrice().toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">${pricePerPiece.toFixed(0)} per piece</p>
          </div>
          {setOptions[setType].discount > 0 && (
            <Badge variant="secondary" className="text-xs">
              Save {setOptions[setType].discount * 100}%
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
