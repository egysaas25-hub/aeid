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

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl mb-4">
            What Our Partners Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied shop owners who trust us for authentic Egyptian apparel
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
