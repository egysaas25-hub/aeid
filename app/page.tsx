import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { PricingSection } from "@/components/pricing-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { OrderSection } from "@/components/order-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <PricingSection />
        <AboutSection />
        <TestimonialsSection />
        <OrderSection />
      </main>
      <Footer />
    </div>
  )
}
