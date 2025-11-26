"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Tutankhamun V-Neck Dress",
    description: "Vibrant digital print featuring the iconic golden mask on premium silky fabric",
    price: 700,
    image: "/tutankhamun-gold-mask-dress-on-model-egyptian-them.jpg",
    category: "Royal Icons",
  },
  {
    id: "2",
    name: "Nefertiti Belted Robe",
    description: "Elegant long robe with stunning Nefertiti bust print and matching belt",
    price: 700,
    image: "/nefertiti-bust-elegant-robe-egyptian-queen-fashion.jpg",
    category: "Royal Icons",
  },
  {
    id: "3",
    name: "Horus Falcon Shirt",
    description: "Majestic falcon with pyramids design on comfortable long-sleeve shirt",
    price: 700,
    image: "/egyptian-falcon-with-pyramids-shirt-ancient-egypti.jpg",
    category: "Mythical Birds",
  },
  {
    id: "4",
    name: "Cleopatra Portrait Dress",
    description: "Sophisticated dress featuring Cleopatra with traditional headdress",
    price: 700,
    image: "/cleopatra-portrait-dress-egyptian-queen-elegant-cl.jpg",
    category: "Royal Icons",
  },
  {
    id: "5",
    name: "Anubis Guardian Tunic",
    description: "Striking Anubis god print on flowing tunic with ancient hieroglyphs",
    price: 700,
    image: "/anubis-egyptian-god-tunic-with-hieroglyphs-ancient.jpg",
    category: "Divine Collection",
  },
  {
    id: "6",
    name: "Pyramid Sunset Kaftan",
    description: "Luxurious kaftan featuring pyramids at sunset with gold accents",
    price: 700,
    image: "/egyptian-pyramids-sunset-kaftan-luxury-desert-scen.jpg",
    category: "Landscape",
  },
]

export function ProductGallery() {
  return (
    <section id="products" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Our Exclusive Collection
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Authentic Egyptian artwork printed on premium fabrics. Each piece is crafted for bazaars and retail shops
            looking to offer unique, high-quality apparel.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
