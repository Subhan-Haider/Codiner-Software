import express from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

const router = express.Router();

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional()
});

const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  age: z.number().min(0).max(150).optional()
});

// Mock data store (replace with actual database)
let users: Array<{ id: number; name: string; email: string; age?: number; createdAt: Date }> = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date()
  }
];

// GET /api/users - Get all users
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedUsers = users.slice(startIndex, endIndex);

    logger.info(`Fetched ${paginatedUsers.length} users`);
    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: users.length,
        pages: Math.ceil(users.length / Number(limit))
      }
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    logger.info(`Fetched user ${userId}`);
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const newUser = {
      id: users.length + 1,
      ...validatedData,
      createdAt: new Date()
    };

    users.push(newUser);

    logger.info(`Created new user with ID ${newUser.id}`);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    logger.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const validatedData = updateUserSchema.parse(req.body);
    users[userIndex] = { ...users[userIndex], ...validatedData };

    logger.info(`Updated user ${userId}`);
    res.json({ success: true, data: users[userIndex] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    logger.error('Error updating user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    logger.info(`Deleted user ${userId}`);
    res.json({ success: true, data: deletedUser });
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
