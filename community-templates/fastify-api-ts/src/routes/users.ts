import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().min(0).max(150).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters'),
  age: z.number().min(0, 'Age must be at least 0').max(150, 'Age must not exceed 150').optional(),
});

const updateUserSchema = createUserSchema.partial();

type User = z.infer<typeof userSchema>;
type CreateUserInput = z.infer<typeof createUserSchema>;
type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Mock data store (replace with actual database)
let users: User[] = [
  {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe',
    age: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'jane@example.com',
    name: 'Jane Smith',
    age: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextId = 3;

const usersRoute: FastifyPluginAsync = async (fastify) => {
  // GET /api/users - Get all users
  fastify.get('/', {
    schema: {
      description: 'Get all users with optional pagination',
      tags: ['users'],
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'number', minimum: 1, maximum: 100 },
          offset: { type: 'number', minimum: 0 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: { $ref: 'User' }
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number' },
                limit: { type: 'number' },
                total: { type: 'number' },
                pages: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { limit = 10, offset = 0 } = request.query as { limit?: number; offset?: number };

    const paginatedUsers = users.slice(offset, offset + limit);
    const totalPages = Math.ceil(users.length / limit);

    return {
      success: true,
      data: paginatedUsers,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: users.length,
        pages: totalPages
      }
    };
  });

  // GET /api/users/:id - Get user by ID
  fastify.get('/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: 'User' }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = parseInt(id);

    const user = users.find(u => u.id === userId);
    if (!user) {
      return reply.code(404).send({
        success: false,
        error: 'User not found'
      });
    }

    return {
      success: true,
      data: user
    };
  });

  // POST /api/users - Create new user
  fastify.post('/', {
    schema: {
      description: 'Create a new user',
      tags: ['users'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string', minLength: 2, maxLength: 50 },
          age: { type: 'number', minimum: 0, maximum: 150 }
        },
        required: ['email', 'name']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: 'User' }
          }
        },
        409: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const input = createUserSchema.parse(request.body);

    // Check if email already exists
    const existingUser = users.find(u => u.email === input.email);
    if (existingUser) {
      return reply.code(409).send({
        success: false,
        error: 'User with this email already exists'
      });
    }

    const newUser: User = {
      id: nextId++,
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    reply.code(201);
    return {
      success: true,
      data: newUser
    };
  });

  // PUT /api/users/:id - Update user
  fastify.put('/:id', {
    schema: {
      description: 'Update user by ID',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string', minLength: 2, maxLength: 50 },
          age: { type: 'number', minimum: 0, maximum: 150 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: 'User' }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = parseInt(id);
    const input = updateUserSchema.parse(request.body);

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return reply.code(404).send({
        success: false,
        error: 'User not found'
      });
    }

    // Check if email is being updated and already exists
    if (input.email) {
      const existingUser = users.find(u => u.email === input.email && u.id !== userId);
      if (existingUser) {
        return reply.code(409).send({
          success: false,
          error: 'User with this email already exists'
        });
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      ...input,
      updatedAt: new Date(),
    };

    return {
      success: true,
      data: users[userIndex]
    };
  });

  // DELETE /api/users/:id - Delete user
  fastify.delete('/:id', {
    schema: {
      description: 'Delete user by ID',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: 'User' }
          }
        },
        404: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const userId = parseInt(id);

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return reply.code(404).send({
        success: false,
        error: 'User not found'
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return {
      success: true,
      data: deletedUser
    };
  });
};

// Add schemas to the Fastify instance
const addSchemas = async (fastify: any) => {
  fastify.addSchema({
    $id: 'User',
    type: 'object',
    properties: {
      id: { type: 'number' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      age: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  });
};

export default usersRoute;
