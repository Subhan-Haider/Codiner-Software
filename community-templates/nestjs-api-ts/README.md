# NestJS API Template with TypeScript

A comprehensive REST API template built with NestJS, TypeScript, and modern enterprise patterns featuring dependency injection, decorators, and production-ready architecture.

## ✨ Features

- **🏗️ Enterprise Architecture**: Modular structure with dependency injection
- **🔷 TypeScript First**: Full TypeScript support with decorators and metadata
- **🛡️ Security**: Helmet, CORS, rate limiting, and JWT authentication
- **📋 Validation**: Class-validator integration with automatic validation
- **📚 API Documentation**: Swagger/OpenAPI documentation
- **🧪 Testing**: Jest setup for unit and integration tests
- **🔄 Error Handling**: Global exception filters and interceptors
- **📊 Logging**: Structured logging with Winston
- **🚀 Production Ready**: Optimized builds and deployment configurations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/nestjs-api-ts my-nest-api
cd my-nest-api

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
npm run start:dev

# Server will be available at http://localhost:3001
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 📁 Project Structure

```
nestjs-api-ts/
├── src/
│   ├── auth/                    # Authentication module
│   ├── common/                  # Shared utilities and decorators
│   ├── products/                # Products module
│   ├── users/                   # Users module
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── entities/            # Entity definitions
│   │   ├── users.controller.ts  # REST endpoints
│   │   ├── users.module.ts      # Module definition
│   │   └── users.service.ts     # Business logic
│   ├── app.module.ts            # Root application module
│   └── main.ts                  # Application entry point
├── test/                        # Test files
├── .env.example                 # Environment variables template
├── nest-cli.json               # NestJS CLI configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                    # Documentation
```

## 🛠️ API Endpoints

### Health Check

```bash
GET /health
```

Returns server health status and uptime.

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
PATCH  /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user
```

### Products API

```bash
GET    /api/products           # Get all products (with filtering & pagination)
GET    /api/products/:id       # Get product by ID
POST   /api/products           # Create new product
PATCH  /api/products/:id       # Update product
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
  "id": 3,
  "email": "john@example.com",
  "name": "John Doe",
  "age": 30,
  "createdAt": "2024-01-10T12:00:00.000Z",
  "updatedAt": "2024-01-10T12:00:00.000Z"
}
```

### Get Users with Pagination

```bash
GET /api/users?limit=10&offset=0
```

Response:
```json
[
  {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "age": 30,
    "createdAt": "2024-01-10T12:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  }
]
```

## 🏗️ Core Concepts

### Modules

NestJS applications are organized into modules:

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### Controllers

Handle HTTP requests and responses:

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### Services

Contain business logic and data operations:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    // Implementation...
  }
}
```

### DTOs and Validation

Use class-validator for input validation:

```typescript
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User full name' })
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
```

## 🔐 Authentication (Optional)

JWT-based authentication is included:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('protected')
@UseGuards(JwtAuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```

## 🧪 Testing

### Unit Tests

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### E2E Tests

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200);
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
EXPOSE 3001
CMD ["node", "dist/main"]
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
npm run start:prod
```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Database (when adding database)
# DATABASE_URL=postgresql://user:password@localhost:5432/nestjs_api
```

### NestJS Configuration

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

## 📚 Resources

### Official Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Swagger/OpenAPI Documentation](https://swagger.io/)

### Learning Resources

- [NestJS Course](https://docs.nestjs.com/courses)
- [NestJS YouTube Channel](https://www.youtube.com/c/NestJSOfficial)
- [Awesome NestJS](https://github.com/juliandavidmr/awesome-nestjs)

### Community

- [NestJS Discord](https://discord.gg/nestjs)
- [NestJS GitHub](https://github.com/nestjs/nest)
- [NestJS Twitter](https://twitter.com/nestframework)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
