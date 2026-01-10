# Express.js API Template with Node.js and TypeScript

A comprehensive REST API template built with Express.js, Node.js, and TypeScript featuring security, validation, logging, and production-ready patterns.

## ✨ Features

- **🚀 Express.js**: Fast, unopinionated web framework for Node.js
- **🔷 TypeScript**: Full TypeScript support with strict type checking
- **🛡️ Security**: Helmet, CORS, rate limiting, and input validation
- **📝 Logging**: Winston-based logging with file and console outputs
- **✅ Validation**: Zod schema validation for request data
- **🔄 Error Handling**: Centralized error handling with custom middleware
- **📊 Health Checks**: Built-in health check endpoints
- **🧪 Testing**: Jest setup for unit and integration tests
- **📚 Documentation**: Comprehensive API documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/express-api-ts my-api
cd my-api

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

# Server will be available at http://localhost:3000
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm run prod
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
express-api-ts/
├── src/
│   ├── middleware/
│   │   ├── errorHandler.ts    # Global error handling
│   │   └── notFound.ts        # 404 handler
│   ├── routes/
│   │   ├── users.ts          # User CRUD operations
│   │   └── products.ts       # Product CRUD operations
│   ├── types/                # TypeScript type definitions
│   ├── utils/
│   │   └── logger.ts         # Winston logger configuration
│   └── server.ts             # Main server file
├── logs/                     # Log files (created automatically)
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

### Users API

```bash
GET    /api/users              # Get all users (with pagination)
GET    /api/users/:id          # Get user by ID
POST   /api/users              # Create new user
PUT    /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user
```

### Products API

```bash
GET    /api/products           # Get all products (with filtering & pagination)
GET    /api/products/:id       # Get product by ID
POST   /api/products           # Create new product
PUT    /api/products/:id       # Update product
DELETE /api/products/:id       # Delete product
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
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2024-01-10T12:00:00.000Z"
  }
}
```

### Get Products with Filtering

```bash
GET /api/products?category=Electronics&inStock=true&page=1&limit=10
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

## 🛡️ Security Features

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable via environment variables

### Input Validation
- Zod schema validation for all inputs
- Type-safe request/response handling

### CORS Configuration
- Configurable allowed origins
- Credentials support

### Security Headers
- Helmet.js for security headers
- XSS protection, content security policy

## 📊 Logging

### Log Levels
- `error`: Error conditions
- `warn`: Warning conditions
- `info`: Informational messages
- `debug`: Debug information

### Log Files
- `logs/error.log`: Error logs only
- `logs/combined.log`: All log levels
- Console output with colors

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "sourceMap": true
  }
}
```

## 🧪 Testing

### Unit Tests

```typescript
// Example test
describe('GET /api/users', () => {
  it('should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

### Integration Tests

```typescript
describe('User API', () => {
  it('should create and retrieve a user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const createResponse = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    const userId = createResponse.body.data.id;

    const getResponse = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(getResponse.body.data.name).toBe(userData.name);
  });
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
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway deploy
```

### Vercel (Serverless)

```javascript
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

## 🔧 Development Tools

### VS Code Extensions

- **TypeScript Importer**: Auto import suggestions
- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **Thunder Client**: API testing

### Scripts

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "npm run build && node dist/server.js",
    "lint": "eslint src --ext .ts",
    "test": "jest",
    "format": "prettier --write src/**/*.ts"
  }
}
```

## 📚 Resources

### Official Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Libraries Used

- [Zod](https://zod.dev/) - Schema validation
- [Winston](https://github.com/winstonjs/winston) - Logging
- [Helmet](https://helmetjs.github.io/) - Security headers
- [CORS](https://github.com/expressjs/cors) - CORS middleware

### Learning Resources

- [Express.js Guide](https://expressjs.com/en/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Design](https://restfulapi.net/)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
