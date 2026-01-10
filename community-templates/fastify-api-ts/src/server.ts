import Fastify, { FastifyInstance } from 'fastify';
import autoLoad from '@fastify/autoload';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const server: FastifyInstance = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
await server.register(import('@fastify/helmet'), {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
});

await server.register(import('@fastify/cors'), {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});

await server.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  })
});

await server.register(import('@fastify/sensible'));

// Swagger documentation
await server.register(import('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Fastify API',
      description: 'A high-performance API built with Fastify and TypeScript',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'users', description: 'User management endpoints' },
      { name: 'products', description: 'Product management endpoints' }
    ]
  }
});

await server.register(import('@fastify/swagger-ui'), {
  routePrefix: '/api/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

// Health check endpoint
server.get('/health', async () => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
});

// API root endpoint
server.get('/api', async () => {
  return {
    message: 'Fastify API with TypeScript',
    version: '1.0.0',
    docs: '/api/docs',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      health: '/health'
    }
  };
});

// Auto-load routes
await server.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  options: { prefix: '/api' }
});

// Graceful shutdown
const closeGracefully = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully`);
  await server.close();
  process.exit(0);
};

process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3002');
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`🚀 Server listening on http://localhost:${port}`);
    server.log.info(`📚 API documentation available at http://localhost:${port}/api/docs`);
    server.log.info(`❤️  Health check available at http://localhost:${port}/health`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
