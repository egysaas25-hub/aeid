import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="exclusives" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl mb-4">
            Exclusive Egyptian Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular designs featuring authentic Egyptian artwork. Each piece tells a story of ancient
            civilization and timeless beauty.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}
