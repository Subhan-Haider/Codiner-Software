/**
 * Docker Auto-Generator
 * Analyzes project and generates Dockerfile, docker-compose.yml, and .dockerignore
 */

import * as fs from "fs/promises";
import * as path from "path";
import log from "electron-log";

const logger = log.scope("docker-generator");

interface ProjectInfo {
    name: string;
    framework: string;
    language: string;
    packageManager: "npm" | "yarn" | "pnpm";
    nodeVersion: string;
    hasDatabase: boolean;
    databaseType?: "postgres" | "mysql" | "mongodb" | "redis";
    hasEnvFile: boolean;
    buildCommand?: string;
    startCommand?: string;
    port: number;
}

interface DockerConfig {
    dockerfile: string;
    dockerCompose: string;
    dockerIgnore: string;
}

/**
 * Analyze project to determine Docker configuration
 */
export async function analyzeProject(projectPath: string): Promise<ProjectInfo> {
    try {
        // Read package.json
        const packageJsonPath = path.join(projectPath, "package.json");
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

        // Detect framework
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        let framework = "node";
        let port = 3000;

        if (deps["next"]) {
            framework = "nextjs";
            port = 3000;
        } else if (deps["react"] && deps["react-scripts"]) {
            framework = "create-react-app";
            port = 3000;
        } else if (deps["vite"]) {
            framework = "vite";
            port = 5173;
        } else if (deps["@angular/core"]) {
            framework = "angular";
            port = 4200;
        } else if (deps["vue"]) {
            framework = "vue";
            port = 8080;
        } else if (deps["express"]) {
            framework = "express";
            port = 3000;
        } else if (deps["fastify"]) {
            framework = "fastify";
            port = 3000;
        } else if (deps["nestjs"]) {
            framework = "nestjs";
            port = 3000;
        }

        // Detect language
        const language = deps["typescript"] ? "typescript" : "javascript";

        // Detect package manager
        let packageManager: "npm" | "yarn" | "pnpm" = "npm";
        try {
            await fs.access(path.join(projectPath, "yarn.lock"));
            packageManager = "yarn";
        } catch {
            try {
                await fs.access(path.join(projectPath, "pnpm-lock.yaml"));
                packageManager = "pnpm";
            } catch {
                packageManager = "npm";
            }
        }

        // Detect database
        let hasDatabase = false;
        let databaseType: "postgres" | "mysql" | "mongodb" | "redis" | undefined;

        if (deps["pg"] || deps["postgres"]) {
            hasDatabase = true;
            databaseType = "postgres";
        } else if (deps["mysql"] || deps["mysql2"]) {
            hasDatabase = true;
            databaseType = "mysql";
        } else if (deps["mongodb"] || deps["mongoose"]) {
            hasDatabase = true;
            databaseType = "mongodb";
        } else if (deps["redis"] || deps["ioredis"]) {
            hasDatabase = true;
            databaseType = "redis";
        }

        // Check for .env file
        let hasEnvFile = false;
        try {
            await fs.access(path.join(projectPath, ".env"));
            hasEnvFile = true;
        } catch {
            try {
                await fs.access(path.join(projectPath, ".env.example"));
                hasEnvFile = true;
            } catch {
                // No env file
            }
        }

        // Get Node version
        const nodeVersion = process.version.replace("v", "");

        return {
            name: packageJson.name || "app",
            framework,
            language,
            packageManager,
            nodeVersion,
            hasDatabase,
            databaseType,
            hasEnvFile,
            buildCommand: packageJson.scripts?.build,
            startCommand: packageJson.scripts?.start,
            port,
        };
    } catch (error) {
        logger.error("Failed to analyze project:", error);
        throw new Error("Failed to analyze project");
    }
}

/**
 * Generate Dockerfile
 */
export function generateDockerfile(info: ProjectInfo): string {
    const { framework, language, packageManager, nodeVersion } = info;

    // Determine base image
    const baseImage = `node:${nodeVersion.split(".")[0]}-alpine`;

    // Package manager commands
    const installCmd =
        packageManager === "yarn"
            ? "yarn install --frozen-lockfile"
            : packageManager === "pnpm"
                ? "pnpm install --frozen-lockfile"
                : "npm ci";

    const buildCmd =
        packageManager === "yarn"
            ? "yarn build"
            : packageManager === "pnpm"
                ? "pnpm build"
                : "npm run build";

    const startCmd =
        packageManager === "yarn"
            ? "yarn start"
            : packageManager === "pnpm"
                ? "pnpm start"
                : "npm start";

    // Multi-stage build for production
    if (framework === "nextjs") {
        return `# Build stage
FROM ${baseImage} AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
${packageManager === "yarn" ? "COPY yarn.lock ./" : ""}
${packageManager === "pnpm" ? "COPY pnpm-lock.yaml ./" : ""}

# Install dependencies
RUN ${installCmd}

# Copy source code
COPY . .

# Build application
RUN ${buildCmd}

# Production stage
FROM ${baseImage} AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE ${info.port}

# Start application
CMD ["node", "server.js"]
`;
    } else if (framework === "vite" || framework === "create-react-app") {
        return `# Build stage
FROM ${baseImage} AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
${packageManager === "yarn" ? "COPY yarn.lock ./" : ""}
${packageManager === "pnpm" ? "COPY pnpm-lock.yaml ./" : ""}

# Install dependencies
RUN ${installCmd}

# Copy source code
COPY . .

# Build application
RUN ${buildCmd}

# Production stage with nginx
FROM nginx:alpine AS runner

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
`;
    } else {
        // Generic Node.js application
        return `# Build stage
FROM ${baseImage} AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
${packageManager === "yarn" ? "COPY yarn.lock ./" : ""}
${packageManager === "pnpm" ? "COPY pnpm-lock.yaml ./" : ""}

# Install dependencies
RUN ${installCmd}

# Copy source code
COPY . .

# Build if needed
${info.buildCommand ? `RUN ${buildCmd}` : ""}

# Production stage
FROM ${baseImage} AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy from builder
COPY --from=builder /app ./

# Install production dependencies only
RUN ${packageManager === "yarn" ? "yarn install --production --frozen-lockfile" : packageManager === "pnpm" ? "pnpm install --prod --frozen-lockfile" : "npm ci --only=production"}

# Expose port
EXPOSE ${info.port}

# Start application
CMD ["${startCmd}"]
`;
    }
}

/**
 * Generate docker-compose.yml
 */
export function generateDockerCompose(info: ProjectInfo): string {
    const services: string[] = [];

    // Main application service
    services.push(`  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "${info.port}:${info.port}"
    environment:
      - NODE_ENV=production
      ${info.hasEnvFile ? "- DATABASE_URL=\${DATABASE_URL}" : ""}
    ${info.hasDatabase ? `depends_on:
      - ${info.databaseType}` : ""}
    restart: unless-stopped
    networks:
      - app-network`);

    // Database service
    if (info.hasDatabase && info.databaseType) {
        if (info.databaseType === "postgres") {
            services.push(`  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=\${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD:-postgres}
      - POSTGRES_DB=\${POSTGRES_DB:-${info.name}}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - app-network`);
        } else if (info.databaseType === "mysql") {
            services.push(`  mysql:
    image: mysql:8-alpine
    environment:
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD:-root}
      - MYSQL_DATABASE=\${MYSQL_DATABASE:-${info.name}}
      - MYSQL_USER=\${MYSQL_USER:-user}
      - MYSQL_PASSWORD=\${MYSQL_PASSWORD:-password}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - app-network`);
        } else if (info.databaseType === "mongodb") {
            services.push(`  mongodb:
    image: mongo:7-alpine
    environment:
      - MONGO_INITDB_ROOT_USERNAME=\${MONGO_USERNAME:-admin}
      - MONGO_INITDB_ROOT_PASSWORD=\${MONGO_PASSWORD:-password}
      - MONGO_INITDB_DATABASE=\${MONGO_DATABASE:-${info.name}}
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped
    networks:
      - app-network`);
        } else if (info.databaseType === "redis") {
            services.push(`  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - app-network`);
        }
    }

    // Build volumes section
    const volumes: string[] = [];
    if (info.databaseType === "postgres") volumes.push("  postgres_data:");
    if (info.databaseType === "mysql") volumes.push("  mysql_data:");
    if (info.databaseType === "mongodb") volumes.push("  mongodb_data:");
    if (info.databaseType === "redis") volumes.push("  redis_data:");

    return `version: '3.8'

services:
${services.join("\n\n")}

${volumes.length > 0 ? `volumes:\n${volumes.join("\n")}` : ""}

networks:
  app-network:
    driver: bridge
`;
}

/**
 * Generate .dockerignore
 */
export function generateDockerIgnore(info: ProjectInfo): string {
    const ignorePatterns = [
        "# Dependencies",
        "node_modules",
        "npm-debug.log*",
        "yarn-debug.log*",
        "yarn-error.log*",
        "pnpm-debug.log*",
        "",
        "# Testing",
        "coverage",
        "*.test.js",
        "*.test.ts",
        "*.spec.js",
        "*.spec.ts",
        "__tests__",
        "",
        "# Build outputs",
        "dist",
        "build",
        ".next",
        "out",
        "",
        "# Environment",
        ".env",
        ".env.local",
        ".env.*.local",
        "",
        "# IDE",
        ".vscode",
        ".idea",
        "*.swp",
        "*.swo",
        "*~",
        "",
        "# OS",
        ".DS_Store",
        "Thumbs.db",
        "",
        "# Git",
        ".git",
        ".gitignore",
        ".gitattributes",
        "",
        "# Docker",
        "Dockerfile",
        "docker-compose.yml",
        ".dockerignore",
        "",
        "# Documentation",
        "README.md",
        "CHANGELOG.md",
        "LICENSE",
        "docs",
        "",
        "# Misc",
        "*.log",
        ".cache",
        "tmp",
        "temp",
    ];

    return ignorePatterns.join("\n");
}

/**
 * Generate nginx configuration for static sites
 */
export function generateNginxConfig(): string {
    return `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
`;
}

/**
 * Generate complete Docker configuration
 */
export async function generateDockerConfig(
    projectPath: string,
): Promise<DockerConfig> {
    logger.info(`Generating Docker config for: ${projectPath}`);

    // Analyze project
    const info = await analyzeProject(projectPath);

    // Generate files
    const dockerfile = generateDockerfile(info);
    const dockerCompose = generateDockerCompose(info);
    const dockerIgnore = generateDockerIgnore(info);

    return {
        dockerfile,
        dockerCompose,
        dockerIgnore,
    };
}

/**
 * Save Docker configuration to files
 */
export async function saveDockerConfig(
    projectPath: string,
    config: DockerConfig,
): Promise<void> {
    try {
        await Promise.all([
            fs.writeFile(path.join(projectPath, "Dockerfile"), config.dockerfile),
            fs.writeFile(
                path.join(projectPath, "docker-compose.yml"),
                config.dockerCompose,
            ),
            fs.writeFile(path.join(projectPath, ".dockerignore"), config.dockerIgnore),
        ]);

        // Generate nginx config if needed
        const packageJson = JSON.parse(
            await fs.readFile(path.join(projectPath, "package.json"), "utf-8"),
        );
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        if (deps["vite"] || deps["react-scripts"]) {
            const nginxConfig = generateNginxConfig();
            await fs.writeFile(path.join(projectPath, "nginx.conf"), nginxConfig);
        }

        logger.info("Docker configuration saved successfully");
    } catch (error) {
        logger.error("Failed to save Docker config:", error);
        throw error;
    }
}
