export interface Template {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  isOfficial: boolean;
  isExperimental?: boolean;
  requiresNeon?: boolean;
}

// API Template interface from the external API
export interface ApiTemplate {
  githubOrg: string;
  githubRepo: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const DEFAULT_TEMPLATE_ID = "react";
export const DEFAULT_TEMPLATE = {
  id: "react",
  title: "React.js Template",
  description: "Uses React.js, Vite, Shadcn, Tailwind and TypeScript.",
  imageUrl:
    "https://github.com/user-attachments/assets/5b700eab-b28c-498e-96de-8649b14c16d9",
  isOfficial: true,
};

const PORTAL_MINI_STORE_ID = "portal-mini-store";
export const NEON_TEMPLATE_IDS = new Set<string>([]);

export const localTemplatesData: Template[] = [
  DEFAULT_TEMPLATE,
  {
    id: "nextjs-official",
    title: "Next.js Template",
    description: "Uses Next.js, React.js, Shadcn, Tailwind and TypeScript.",
    imageUrl:
      "https://github.com/user-attachments/assets/96258e4f-abce-4910-a62a-a9dff77965f2",
    githubUrl: "https://github.com/Subhan-Haider/nextjs-template",
    isOfficial: true,
  },
  {
    id: PORTAL_MINI_STORE_ID,
    title: "Portal: Mini Store Template",
    description: "Ultimate E-commerce foundation with Neon DB, Payload CMS, and high-conversion UI layouts.",
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/portal-mini-store-template",
    isOfficial: true,
    isExperimental: true,
    requiresNeon: false,
  },
  {
    id: "react-native-expo-web",
    title: "React Native (Expo) + Web (SDK 53)",
    description:
      "An Expo SDK 53 + expo-router v5 starter that runs on iOS/Android and the browser via react-native-web",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/react-native-expo-web",
    isOfficial: false,
  },
  {
    id: "docker-nextjs-lowdb",
    title: "Docker / Next.js / Lowdb / GHCR",
    description:
      "Enterprise-grade Dockerized Next.js stack with persistent dynamic storage, built-in CORS proxy, and automated CI/CD readiness.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/docker-nextjs-lowdb",
    isOfficial: false,
  },
  {
    id: "vue-ts-vite-tailwind",
    title: "Vue",
    description:
      "A minimal, production-ready Vue 3 starter template with TypeScript, Vite, and Tailwind CSS v3.",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/vue-ts-vite-tailwind",
    isOfficial: false,
  },
  {
    id: "angular-codiner",
    title: "Angular",
    description: "Angular template for Codiner",
    imageUrl:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "chrome-extension-starter",
    title: "Chrome Extension Starter",
    description:
      "Professional Chrome Extension boilerplate with HMR and multi-page support. Note: Build browser tools in record time (external testing required).",
    imageUrl:
      "https://images.unsplash.com/photo-1451187530221-893073e7a701?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/chrome-extension-starter",
    isOfficial: false,
  },
  {
    id: "react-router-7",
    title: "React Router 7 + File System Routes",
    description:
      "Modern template using react-router v7 with file based routing from fs-routes and prismaORM for database management. Uses tailwind css, and shadcn/ui",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Subhan-Haider/react-router-7",
    isOfficial: false,
  },
  {
    id: "fastapi-pro",
    title: "FastAPI + SQLModel Pro",
    description: "High-performance Python API with automatic OpenAPI documentation, SQLModel integration, and JWT authentication.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
    isExperimental: true,
  },
  {
    id: "rust-axum-rocket",
    title: "Rust Axum + SQLx Starter",
    description: "Blazing fast, type-safe Rust backend with Axum, SQLx for PostgreSQL, and production-grade logging.",
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "sveltekit-supabase",
    title: "SvelteKit + Supabase Fullstack",
    description: "Modern fullstack development with SvelteKit's simplicity and Supabase's power. Includes Auth and DB hooks.",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "astro-modern-blog",
    title: "Astro 4.0 SEO Blog",
    description: "Ultra-fast content-driven site with Astro, MDX, Content Collections, and automatic OG image generation.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "solidjs-glass-dashboard",
    title: "SolidJS Glassmorphism Dashboard",
    description: "Ultra-fast SolidJS dashboard featuring extreme glassmorphism effects and reactive data streaming for high-performance dashboards.",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "tauri-desktop-starter",
    title: "Tauri Cross-Platform Desktop",
    description: "Build secure, lightweight desktop apps using Rust and web technologies. Pre-configured for Vite and Shadcn UI.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
    isExperimental: true,
  },
  {
    id: "nuxt-ultra-portfolio",
    title: "Nuxt 3 Ultra Portfolio",
    description: "Premium developer portfolio template with Nuxt 3, Framer Motion, and server-side rendering for perfect SEO.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "bun-elysia-api",
    title: "Bun + Elysia Hyper API",
    description: "The fastest TypeScript API stack: Bun runtime, Elysia framework, and Eden for end-to-end type safety.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "go-fiber-htmx",
    title: "Go Fiber + HTMX Stack",
    description: "Clean, efficient Go backend with Fiber and low-JS interactivity using HTMX. Perfect for modern monoliths.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
  {
    id: "python-flask-lite",
    title: "Flask Micro-SaaS Starter",
    description: "Lightweight Python Flask boilerplate with Stripe integration, SQLAlchemy, and clean blueprint architecture.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    isOfficial: false,
  },
];
