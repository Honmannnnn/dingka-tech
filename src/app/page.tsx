import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeaturedCards from '@/components/FeaturedCards'
import ServicesSection from '@/components/ServicesSection'
import NewsSection from '@/components/NewsSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturedCards />
      <ServicesSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
