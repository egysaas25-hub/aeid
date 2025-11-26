"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const product = products.find((p) => p.id === params.id)

  const [selectedQuantity, setSelectedQuantity] = useState<"single" | "quarter" | "half" | "full">("single")

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
            <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const quantityMap = {
    single: { qty: 1, discount: 0, label: "Single (1 pc)" },
    quarter: { qty: 3, discount: 0.1, label: "Quarter Set (3 pcs - 10% off)" },
    half: { qty: 6, discount: 0.15, label: "Half Set (6 pcs - 15% off)" },
    full: { qty: 12, discount: 0.2, label: "Full Set (12 pcs - 20% off)" },
  }

  const selectedOption = quantityMap[selectedQuantity]
  const discountedPrice = product.price * (1 - selectedOption.discount)
  const totalPrice = discountedPrice * selectedOption.qty

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedQuantity}`,
      name: product.name,
      price: discountedPrice,
      quantity: selectedOption.qty,
      setType: selectedQuantity,
      image: product.image,
    })

    toast({
      title: "Added to cart!",
      description: `${selectedOption.qty} x ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => router.push("/shop")} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 text-sm font-medium text-accent">{product.category}</div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{product.name}</h1>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{product.fullDescription}</p>
              </div>

              <div className="space-y-4 border-y border-border py-6">
                <div>
                  <h3 className="mb-2 font-semibold">Available Colors:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="rounded-md bg-muted px-3 py-1 text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Available Sizes:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span key={size} className="rounded-md bg-muted px-3 py-1 text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 font-semibold">Select Quantity:</h3>
                  <Select value={selectedQuantity} onValueChange={(value: any) => setSelectedQuantity(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single (1 pc) - $700</SelectItem>
                      <SelectItem value="quarter">Quarter Set (3 pcs - 10% off) - $630/pc</SelectItem>
                      <SelectItem value="half">Half Set (6 pcs - 15% off) - $595/pc</SelectItem>
                      <SelectItem value="full">Full Set (12 pcs - 20% off) - $560/pc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-muted-foreground">Price per piece:</span>
                    <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Price:</span>
                    <span className="font-bold text-accent">${totalPrice.toFixed(2)}</span>
                  </div>
                  {selectedOption.discount > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      You save ${(product.price * selectedOption.discount * selectedOption.qty).toFixed(2)} (
                      {(selectedOption.discount * 100).toFixed(0)}% off)
                    </p>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
