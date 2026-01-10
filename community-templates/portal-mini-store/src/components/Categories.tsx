import { Card, CardContent } from '@/components/ui/card'

// Mock categories - in a real app, this would come from Payload CMS
const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Latest gadgets and tech accessories',
    productCount: 156,
  },
  {
    id: 2,
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    productCount: 89,
  },
  {
    id: 3,
    name: 'Home & Garden',
    description: 'Everything for your home and garden',
    productCount: 234,
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    description: 'Gear for active lifestyles',
    productCount: 67,
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-4xl">📦</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {category.productCount} products
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
