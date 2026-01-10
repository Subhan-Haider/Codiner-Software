import express from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

const router = express.Router();

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  category: z.string().min(2).max(50),
  inStock: z.boolean().default(true)
});

const updateProductSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  price: z.number().positive().optional(),
  category: z.string().min(2).max(50).optional(),
  inStock: z.boolean().optional()
});

// Mock data store (replace with actual database)
let products: Array<{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
}> = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop for developers',
    price: 1299.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Coffee Mug',
    description: 'Programmer-themed coffee mug',
    price: 19.99,
    category: 'Accessories',
    inStock: true,
    createdAt: new Date()
  }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  try {
    const { category, inStock, page = 1, limit = 10 } = req.query;

    let filteredProducts = products;

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p =>
        p.category.toLowerCase().includes((category as string).toLowerCase())
      );
    }

    // Filter by stock status
    if (inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p =>
        p.inStock === (inStock === 'true')
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    logger.info(`Fetched ${paginatedProducts.length} products`);
    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / Number(limit))
      }
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    logger.info(`Fetched product ${productId}`);
    res.json({ success: true, data: product });
  } catch (error) {
    logger.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/products - Create new product
router.post('/', (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const newProduct = {
      id: products.length + 1,
      ...validatedData,
      createdAt: new Date()
    };

    products.push(newProduct);

    logger.info(`Created new product with ID ${newProduct.id}`);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    logger.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const validatedData = updateProductSchema.parse(req.body);
    products[productIndex] = { ...products[productIndex], ...validatedData };

    logger.info(`Updated product ${productId}`);
    res.json({ success: true, data: products[productIndex] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    logger.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    logger.info(`Deleted product ${productId}`);
    res.json({ success: true, data: deletedProduct });
  } catch (error) {
    logger.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
