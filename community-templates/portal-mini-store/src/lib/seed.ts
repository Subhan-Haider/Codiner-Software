import { db } from './db';
import { products, categories } from './schema';

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Create categories
    const categoryData = [
      { name: 'Electronics', description: 'Electronic devices and accessories', slug: 'electronics' },
      { name: 'Clothing', description: 'Fashion and apparel', slug: 'clothing' },
      { name: 'Books', description: 'Books and publications', slug: 'books' },
      { name: 'Home & Garden', description: 'Home improvement and gardening', slug: 'home-garden' },
    ];

    const createdCategories = await db.insert(categories).values(categoryData).returning();

    // Create sample products
    const productData = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: '199.99',
        imageUrl: '/images/headphones.jpg',
        categoryId: createdCategories[0].id,
        stock: 50,
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: '299.99',
        imageUrl: '/images/smartwatch.jpg',
        categoryId: createdCategories[0].id,
        stock: 30,
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors',
        price: '24.99',
        imageUrl: '/images/tshirt.jpg',
        categoryId: createdCategories[1].id,
        stock: 100,
      },
      {
        name: 'JavaScript Guide Book',
        description: 'Comprehensive guide to modern JavaScript',
        price: '39.99',
        imageUrl: '/images/js-book.jpg',
        categoryId: createdCategories[2].id,
        stock: 75,
      },
      {
        name: 'Garden Tools Set',
        description: 'Complete set of essential gardening tools',
        price: '89.99',
        imageUrl: '/images/garden-tools.jpg',
        categoryId: createdCategories[3].id,
        stock: 25,
      },
    ];

    await db.insert(products).values(productData);

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${createdCategories.length} categories and ${productData.length} products`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
