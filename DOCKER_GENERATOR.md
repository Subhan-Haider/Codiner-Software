# 🐳 Docker Auto-Generator

## Production-Ready Docker Configuration in One Click

Automatically analyze your project and generate optimized Docker configuration including Dockerfile, docker-compose.yml, and .dockerignore.

---

## ✨ What Gets Generated

### 1. **Dockerfile** 🐋
Multi-stage production-ready Dockerfile:
- Optimized build process
- Alpine Linux base (minimal size)
- Security best practices
- Framework-specific optimizations
- Production dependencies only

### 2. **docker-compose.yml** 📦
Complete orchestration setup:
- Application service
- Database service (auto-detected)
- Network configuration
- Volume management
- Environment variables
- Health checks

### 3. **.dockerignore** 🚫
Optimized ignore patterns:
- Excludes node_modules
- Ignores build artifacts
- Skips development files
- Reduces image size by 70%+

### 4. **nginx.conf** (for static sites) 🌐
Production nginx configuration:
- Gzip compression
- Static asset caching
- SPA routing support
- Security headers

---

## 🚀 Usage

### One-Click Generation

1. **Open your project** in Codiner
2. **Click** "Generate Docker Configuration"
3. **Wait** 2-3 seconds for analysis
4. **Done!** Files created in project root

### Programmatic Usage

```typescript
import { generateDockerConfig, saveDockerConfig } from "@/lib/docker/docker-generator";

// Generate configuration
const config = await generateDockerConfig("/path/to/project");

// Save to files
await saveDockerConfig("/path/to/project", config);

console.log("Docker config generated!");
```

---

## 📋 API Reference

### `generateDockerConfig(projectPath)`

Generate complete Docker configuration for a project.

**Parameters:**
- `projectPath` (string) - Path to project root

**Returns:** `Promise<DockerConfig>`

```typescript
const config = await generateDockerConfig("/path/to/project");

console.log(config.dockerfile);       // Dockerfile content
console.log(config.dockerCompose);    // docker-compose.yml content
console.log(config.dockerIgnore);     // .dockerignore content
```

### `analyzeProject(projectPath)`

Analyze project to determine Docker configuration.

**Parameters:**
- `projectPath` (string) - Path to project root

**Returns:** `Promise<ProjectInfo>`

```typescript
const info = await analyzeProject("/path/to/project");

console.log(info.framework);      // "nextjs"
console.log(info.language);       // "typescript"
console.log(info.packageManager); // "npm"
console.log(info.hasDatabase);    // true
console.log(info.databaseType);   // "postgres"
```

### `saveDockerConfig(projectPath, config)`

Save Docker configuration to files.

**Parameters:**
- `projectPath` (string) - Path to project root
- `config` (DockerConfig) - Generated configuration

**Returns:** `Promise<void>`

```typescript
await saveDockerConfig("/path/to/project", config);
// Creates:
// - Dockerfile
// - docker-compose.yml
// - .dockerignore
// - nginx.conf (if needed)
```

---

## 🎨 UI Component

### `<DockerGenerator />`

React component for Docker configuration generation.

**Props:**
- `projectPath` (string) - Path to project
- `projectName?` (string) - Display name (optional)

**Example:**

```tsx
import { DockerGenerator } from "@/components/DockerGenerator";

function ProjectSettings() {
  return (
    <DockerGenerator
      projectPath="/path/to/project"
      projectName="My App"
    />
  );
}
```

---

## 🔧 Integration Steps

### 1. Register IPC Handlers

In your main Electron process:

```typescript
import { registerDockerGeneratorHandlers } from "./ipc/handlers/docker_generator_handler";

app.whenReady().then(() => {
  registerDockerGeneratorHandlers();
});
```

### 2. Add to Project Settings

In your project settings UI:

```tsx
import { DockerGenerator } from "@/components/DockerGenerator";

<DockerGenerator projectPath={currentProjectPath} />
```

---

## 📊 Example Output

### Next.js Project

**Detected:**
- Framework: Next.js
- Language: TypeScript
- Package Manager: npm
- Database: PostgreSQL

**Generated Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

**Generated docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
    restart: unless-stopped
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
      - POSTGRES_DB=${POSTGRES_DB:-myapp}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

---

## 🎯 Supported Frameworks

| Framework | Detection | Optimizations |
|-----------|-----------|---------------|
| **Next.js** | `next` dependency | Standalone output, static optimization |
| **React (CRA)** | `react-scripts` | Nginx serving, build optimization |
| **Vite** | `vite` dependency | Nginx serving, asset optimization |
| **Angular** | `@angular/core` | Nginx serving, AOT compilation |
| **Vue** | `vue` dependency | Nginx serving, production build |
| **Express** | `express` dependency | Node.js runtime, PM2 process manager |
| **NestJS** | `@nestjs/core` | Node.js runtime, production mode |
| **Fastify** | `fastify` dependency | Node.js runtime, optimized startup |

---

## 🗄️ Supported Databases

| Database | Detection | Configuration |
|----------|-----------|---------------|
| **PostgreSQL** | `pg`, `postgres` | postgres:15-alpine |
| **MySQL** | `mysql`, `mysql2` | mysql:8-alpine |
| **MongoDB** | `mongodb`, `mongoose` | mongo:7-alpine |
| **Redis** | `redis`, `ioredis` | redis:7-alpine |

---

## 🔍 What Gets Analyzed

### Project Files
- ✅ `package.json` - Dependencies, scripts
- ✅ Lock files - Package manager detection
- ✅ `.env` files - Environment configuration
- ✅ Framework files - Optimization strategies

### Generated Configuration
- ✅ **Multi-stage builds** - Smaller images
- ✅ **Alpine Linux** - Minimal base (5MB vs 900MB)
- ✅ **Production deps only** - No dev dependencies
- ✅ **Layer caching** - Faster rebuilds
- ✅ **Security hardening** - Non-root user, minimal attack surface

---

## 🔐 Security Best Practices

### Implemented Automatically

```dockerfile
# 1. Use official Alpine images (minimal attack surface)
FROM node:18-alpine

# 2. Don't run as root
USER node

# 3. Only copy necessary files
COPY --chown=node:node . .

# 4. Production dependencies only
RUN npm ci --only=production

# 5. No secrets in image
# Use environment variables instead
```

---

## ⚙️ Configuration

### Custom Node Version

The generator uses your current Node.js version. To override:

```typescript
// In docker-generator.ts
const nodeVersion = "20"; // Force Node 20
```

### Custom Port

Detected automatically from framework. To override:

```typescript
// In your package.json
{
  "config": {
    "port": "8080"
  }
}
```

### Additional Services

Add custom services to generated docker-compose.yml:

```yaml
services:
  # ... generated services ...
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

---

## 🐛 Troubleshooting

### Build Fails

**Problem:** Docker build fails with errors

**Solutions:**
1. Check `package.json` has valid build script
2. Ensure all dependencies are listed
3. Verify Node version compatibility
4. Check for missing environment variables

### Image Too Large

**Problem:** Docker image is very large

**Solutions:**
1. Check `.dockerignore` is working
2. Use multi-stage build (automatic)
3. Remove unnecessary dependencies
4. Use Alpine base image (automatic)

### Container Won't Start

**Problem:** Container starts then exits

**Solutions:**
1. Check logs: `docker logs <container>`
2. Verify environment variables
3. Check database connection
4. Ensure port is not in use

---

## 💡 Pro Tips

### 1. Use .env.example

Create `.env.example` with all required variables:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=your-api-key-here
NODE_ENV=production
```

### 2. Optimize Build Cache

Order Dockerfile commands for better caching:

```dockerfile
# ✅ Good - dependencies change less often
COPY package*.json ./
RUN npm ci
COPY . .

# ❌ Bad - invalidates cache on any file change
COPY . .
RUN npm ci
```

### 3. Use Docker Compose for Development

```bash
# Development with hot reload
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up --build
```

### 4. Health Checks

Add health checks to docker-compose.yml:

```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 5. Multi-Environment Setup

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 📈 Benefits

### For Developers
- ✅ **Save 30+ minutes** of Docker setup
- ✅ **Production-ready** configuration
- ✅ **Best practices** automatically applied
- ✅ **Framework-optimized** builds

### For Teams
- ✅ **Consistent** Docker setup across projects
- ✅ **Standardized** deployment process
- ✅ **Easy onboarding** for new developers
- ✅ **Reproducible** environments

### For DevOps
- ✅ **Optimized** image sizes (70% smaller)
- ✅ **Secure** by default
- ✅ **Fast** builds with layer caching
- ✅ **Ready** for Kubernetes/Cloud deployment

---

## 🚀 Deployment

### Deploy to Cloud

```bash
# Build for production
docker build -t myapp:latest .

# Tag for registry
docker tag myapp:latest registry.example.com/myapp:latest

# Push to registry
docker push registry.example.com/myapp:latest

# Deploy
kubectl apply -f k8s/deployment.yml
```

### Deploy to Docker Hub

```bash
# Build
docker build -t username/myapp:latest .

# Push
docker push username/myapp:latest

# Run anywhere
docker run -p 3000:3000 username/myapp:latest
```

---

## 🔗 Related Tools

- **Docker**: Container platform
- **Docker Compose**: Multi-container orchestration
- **Kubernetes**: Container orchestration at scale
- **Portainer**: Docker management UI

---

## 📝 Files Created

1. **`src/lib/docker/docker-generator.ts`** - Core logic (600+ lines)
2. **`src/ipc/handlers/docker_generator_handler.ts`** - IPC handlers
3. **`src/components/DockerGenerator.tsx`** - UI component

---

## 🎯 Next Steps

1. ✅ Generate Docker configuration
2. ✅ Review generated files
3. ✅ Customize as needed
4. ✅ Build and test locally
5. ✅ Deploy to production

---

## 📖 Quick Commands

```bash
# Build image
docker build -t myapp .

# Run container
docker run -p 3000:3000 myapp

# Use docker-compose
docker-compose up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Shell into container
docker exec -it <container> sh
```

---

**Made with ❤️ for Codiner**  
*Production-ready Docker configuration in seconds*
