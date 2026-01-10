'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data - in a real app, this would come from Payload CMS
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: '/placeholder-product.jpg',
    category: 'Electronics',
    featured: true,
  },
  {
    id: 2,
    name: 'Designer Watch',
    price: 199.99,
    image: '/placeholder-product.jpg',
    category: 'Fashion',
    featured: true,
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 149.99,
    originalPrice: 199.99,
    image: '/placeholder-product.jpg',
    category: 'Electronics',
    featured: true,
  },
  {
    id: 4,
    name: 'Smart Home Hub',
    price: 249.99,
    image: '/placeholder-product.jpg',
    category: 'Smart Home',
    featured: true,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, curated by our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Product Image</div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full group-hover:bg-blue-600 transition-colors">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <a href="/products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
