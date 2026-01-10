# Fastify API Template with Node.js and TypeScript

A high-performance REST API template built with Fastify, Node.js, and TypeScript featuring low overhead, built-in validation, and production-ready patterns.

## ✨ Features

- **⚡ High Performance**: Fastify's low overhead and high throughput
- **🔷 TypeScript**: Full TypeScript support with strict type checking
- **🛡️ Security**: Helmet, CORS, rate limiting, and input validation
- **📝 Structured Logging**: Pino-based logging with pretty printing
- **✅ Schema Validation**: Built-in JSON Schema validation with Zod
- **📚 API Documentation**: Swagger/OpenAPI documentation
- **🔄 Plugin Architecture**: Modular and extensible design
- **🧪 Testing**: Tap setup for comprehensive testing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/fastify-api-ts my-fastify-api
cd my-fastify-api

# Install dependencies
npm install
```

### Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server will be available at http://localhost:3002
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm run start
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
fastify-api-ts/
├── src/
│   ├── routes/
│   │   ├── users.ts          # User CRUD operations
│   │   └── products.ts       # Product CRUD operations
│   └── server.ts             # Main server file
├── test/                     # Test files
├── .env.example              # Environment variables template
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation
```

## 🛠️ API Endpoints

### Health Check

```bash
GET /health
```

Returns server health status and uptime.

### API Root

```bash
GET /api
```

Returns API information and available endpoints.

### API Documentation

```bash
GET /api/docs
```

Interactive Swagger documentation for all endpoints.

### Users API

```bash
GET    /api/users              # Get all users (with pagination)
GET    /api/users/:id          # Get user by ID
POST   /api/users              # Create new user
PUT    /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user
```

## 📝 Request/Response Examples

### Create User

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "email": "john@example.com",
    "name": "John Doe",
    "age": 30,
    "createdAt": "2024-01-10T12:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  }
}
```

### Get Users with Pagination

```bash
GET /api/users?limit=10&offset=0
```

Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

## 🏗️ Core Concepts

### Plugins

Fastify uses a plugin-based architecture:

```typescript
import { FastifyPluginAsync } from 'fastify';

const myPlugin: FastifyPluginAsync = async (fastify, opts) => {
  // Register routes, decorators, etc.
  fastify.get('/hello', async () => {
    return { hello: 'world' };
  });
};

export default myPlugin;
```

### Route Handlers

Define routes with schema validation:

```typescript
fastify.get('/', {
  schema: {
    description: 'Get all items',
    tags: ['items'],
    querystring: {
      type: 'object',
      properties: {
        limit: { type: 'number' },
        offset: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { type: 'array' }
        }
      }
    }
  }
}, async (request, reply) => {
  // Handler logic
});
```

### Schema Validation

Use JSON Schema for validation:

```typescript
const userSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 2, maxLength: 50 },
    age: { type: 'number', minimum: 0, maximum: 150 }
  },
  required: ['email', 'name']
};
```

### Zod Integration

Combine with Zod for runtime validation:

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().min(0).max(150).optional()
});

// In route handler
const input = createUserSchema.parse(request.body);
```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3002
NODE_ENV=development
LOG_LEVEL=info

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=60000
```

### Fastify Configuration

```typescript
const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});
```

## 🧪 Testing

### Unit Tests

```typescript
import { test } from 'tap';
import { build } from '../helper.js';

test('GET /api/users', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'GET',
    url: '/api/users'
  });

  t.equal(response.statusCode, 200);
  t.hasProp(JSON.parse(response.payload), 'success');
});
```

### Integration Tests

```typescript
test('POST /api/users', async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: 'POST',
    url: '/api/users',
    payload: {
      name: 'Test User',
      email: 'test@example.com'
    }
  });

  t.equal(response.statusCode, 201);
  const body = JSON.parse(response.payload);
  t.equal(body.success, true);
  t.hasProp(body.data, 'id');
});
```

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3002
CMD ["node", "dist/server.js"]
```

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway deploy
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔧 Development Tools

### VS Code Extensions

- **TypeScript Importer**: Auto import suggestions
- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **REST Client**: API testing

### Fastify CLI

```bash
# Generate new route
npx fastify generate-route users
```

## 📚 Resources

### Official Documentation

- [Fastify Documentation](https://fastify.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Swagger/OpenAPI Documentation](https://swagger.io/)

### Learning Resources

- [Fastify Ecosystem](https://fastify.dev/ecosystem/)
- [Fastify Examples](https://github.com/fastify/examples)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Community

- [Fastify Discord](https://discord.gg/fastify)
- [Fastify GitHub](https://github.com/fastify/fastify)
- [Fastify Twitter](https://twitter.com/fastifyjs)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
