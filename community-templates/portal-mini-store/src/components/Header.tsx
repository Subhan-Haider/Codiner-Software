'use client'

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portal Store
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Categories
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
