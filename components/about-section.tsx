import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "These Egyptian designs are absolutely stunning! They fly off the shelves in my bazaar.",
    author: "Ahmed Hassan",
    business: "Cairo Heritage Bazaar",
  },
  {
    quote: "The quality is exceptional and my customers love the authentic artwork. Best wholesale partner!",
    author: "Fatima El-Sayed",
    business: "Nile Treasures Shop",
  },
  {
    quote: "Reliable supplier with beautiful products. The bulk discounts make it perfect for my business.",
    author: "Mohamed Ali",
    business: "Luxor Market",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
              Authentic Egyptian Art, Premium Quality
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We specialize in creating exclusive apparel featuring authentic Egyptian paintings and artwork. Each
                piece is carefully designed to capture the timeless beauty of ancient Egyptian culture, perfect for
                bazaars and retail shops worldwide.
              </p>
              <p>
                Our prints are created using advanced digital printing technology on premium, fade-resistant fabrics
                that ensure long-lasting quality and vibrant colors that your customers will love.
              </p>
              <p>
                With flexible wholesale pricing and bulk discounts, we make it easy for shop owners to stock unique,
                high-margin products that stand out in today's competitive market.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Premium Fabrics</p>
                    <p className="text-sm text-muted-foreground">Soft, durable materials</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Fast Shipping</p>
                    <p className="text-sm text-muted-foreground">7-14 day delivery</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">What Our Partners Say</h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
