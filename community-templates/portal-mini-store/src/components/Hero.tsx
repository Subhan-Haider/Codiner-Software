import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Portal Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover amazing products powered by modern e-commerce technology.
            Built with Payload CMS and Next.js for the ultimate shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
