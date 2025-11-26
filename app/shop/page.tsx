"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products, categories } from "@/lib/products"
import { useState, useMemo, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const INITIAL_PRODUCTS = 9
const LOAD_MORE_COUNT = 6

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name-asc")
  const [displayCount, setDisplayCount] = useState(INITIAL_PRODUCTS)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(INITIAL_PRODUCTS)
  }, [searchQuery, selectedCategory, sortBy])

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && displayCount < filteredAndSortedProducts.length) {
          handleLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [displayCount, filteredAndSortedProducts.length])

  const handleLoadMore = () => {
    if (isLoading || displayCount >= filteredAndSortedProducts.length) return
    
    setIsLoading(true)
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredAndSortedProducts.length))
      setIsLoading(false)
    }, 500)
  }

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount)
  const hasMore = displayCount < filteredAndSortedProducts.length

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              Shop Our Collection
            </h1>
            <p className="text-muted-foreground">
              Browse our exclusive Egyptian-themed apparel with authentic paintings and premium quality.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg papyrus-texture">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 text-sm font-medium text-accent">{product.category}</div>
                      <h3 className="mb-2 text-xl font-bold text-balance">{product.name}</h3>
                      <p className="mb-4 text-sm text-muted-foreground text-pretty">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-secondary">${product.price}</span>
                        <Link href={`/product/${product.id}`}>
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Infinite scroll trigger */}
              {hasMore && (
                <div ref={loadMoreRef} className="mt-12 flex justify-center">
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Loading more products...</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleLoadMore}
                      variant="outline"
                      size="lg"
                      className="papyrus-texture"
                    >
                      Load More Products ({filteredAndSortedProducts.length - displayCount} remaining)
                    </Button>
                  )}
                </div>
              )}

              {/* Show total count */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {displayedProducts.length} of {filteredAndSortedProducts.length} products
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
