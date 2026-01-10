# Docker / Next.js / Lowdb / GHCR Template

This Next.js template provides a Dockerized solution with Lowdb JSON database, built-in CORS proxy, and automated GitHub Actions container builds for simplified deployment.

## ✨ Features

- **🐳 Docker Ready**: Containerized application with optimized Dockerfile
- **📦 Lowdb Database**: Lightweight JSON-based database
- **🚀 GitHub Actions**: Automated container builds and pushes to GHCR
- **🌐 CORS Enabled**: Built-in CORS proxy for API access
- **⚡ Next.js 14**: Latest Next.js with App Router
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **📱 Responsive**: Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- GitHub account (for GHCR deployment)

### Local Development

```bash
# Clone or copy this template
cp -r community-templates/docker-nextjs-lowdb my-app
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Docker Development

```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   └── todos/      # Todo CRUD operations
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   └── TodoList.tsx    # Todo list component
│   └── lib/                # Utility libraries
│       └── db.ts           # Lowdb configuration
├── .github/
│   └── workflows/          # GitHub Actions
│       └── docker.yml      # Docker build workflow
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose (optional)
├── next.config.js          # Next.js configuration
└── tailwind.config.js      # Tailwind CSS config
```

## 📊 Lowdb Database

This template uses Lowdb, a lightweight JSON database for Node.js.

### Features

- **File-based**: Data stored in JSON files
- **Lightweight**: No external database required
- **TypeScript**: Full TypeScript support
- **Lodash**: Powerful query capabilities

### Database Schema

```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
```

### Usage

```typescript
import { dbHelpers } from '@/lib/db';

// Get all todos
const todos = await dbHelpers.getTodos();

// Add a new todo
const newTodo = await dbHelpers.addTodo({
  text: 'Learn Docker',
  completed: false,
});

// Update a todo
const updatedTodo = await dbHelpers.updateTodo('123', {
  completed: true,
});

// Delete a todo
await dbHelpers.deleteTodo('123');
```

## 🐳 Docker Configuration

### Dockerfile

The Dockerfile is optimized for production:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Commands

```bash
# Build image
docker build -t docker-nextjs-lowdb .

# Run container
docker run -p 3000:3000 docker-nextjs-lowdb

# Run with volume for data persistence
docker run -p 3000:3000 -v $(pwd)/data:/app/data docker-nextjs-lowdb
```

## 🚀 GitHub Container Registry (GHCR)

### Automated Builds

Push to the main branch to trigger automated builds:

```bash
git add .
git commit -m "Add new features"
git push origin main
```

### Manual Push

```bash
# Build and tag for GHCR
npm run docker:push

# Replace YOUR_USERNAME with your GitHub username
```

### Pull and Run

```bash
# Pull from GHCR
docker pull ghcr.io/YOUR_USERNAME/docker-nextjs-lowdb:latest

# Run the container
docker run -p 3000:3000 ghcr.io/YOUR_USERNAME/docker-nextjs-lowdb:latest
```

## 🌐 CORS Configuration

CORS is configured in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
      ],
    },
  ];
}
```

## 📱 API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

### Example API Usage

```javascript
// Create a todo
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Learn Next.js' }),
});

// Get all todos
const todos = await fetch('/api/todos').then(res => res.json());
```

## 🎨 Styling

This template uses Tailwind CSS for styling:

```jsx
<div className="bg-white shadow rounded-lg">
  <div className="px-4 py-5 sm:p-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
      Todo List
    </h3>
  </div>
</div>
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Deployment

```bash
# Build for production
docker build -t my-app .

# Run in production
docker run -d -p 3000:3000 --name my-app-container my-app
```

### Railway

1. Connect your GitHub repository
2. Railway will automatically detect Next.js
3. Deploy with one click

## 🔧 Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URL=file:./db.json

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# CORS (optional)
CORS_ORIGIN=*
```

## 🧪 Development Tips

### Hot Reload

The development server supports hot reload. Changes to components, API routes, and styles will be reflected immediately.

### Database Persistence

For development with data persistence:

```bash
# Run with volume mount
docker run -p 3000:3000 -v $(pwd)/db.json:/app/db.json docker-nextjs-lowdb
```

### Debugging

- Use `console.log()` in API routes
- Check Docker logs: `docker logs <container-id>`
- Use Next.js dev tools in browser

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Lowdb Documentation](https://github.com/typicode/lowdb)
- [Docker Documentation](https://docs.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the Apache 2.0 License.
