# Portal: Mini Store Template

Uses Neon DB, Payload CMS, Next.js

## ✨ Features

- **🛍️ Full-Stack E-commerce**: Complete storefront with admin panel
- **📦 Payload CMS**: Headless CMS for content management
- **⚡ Next.js 14**: App Router with server and client components
- **🐘 Neon Database**: Serverless PostgreSQL database
- **💳 Stripe Integration**: Payment processing ready
- **🎨 Modern UI**: Shadcn/UI components with Tailwind CSS
- **📱 Responsive**: Mobile-first design
- **🔍 SEO Optimized**: Server-side rendering and metadata
- **🛡️ Type Safe**: Full TypeScript integration
- **🚀 Production Ready**: Optimized for deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Stripe account (for payments)

### Installation

```bash
# Copy this template
cp -r community-templates/portal-mini-store my-store
cd my-store

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://username:password@hostname/database"

# Payload CMS
PAYLOAD_SECRET="your-secret-key-here"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Next.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate database schema
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data (optional)
npm run db:seed
```

### Development

```bash
# Start both frontend and CMS
npm run dev

# Start only CMS admin panel
npm run cms:dev

# Start only frontend
npm run dev
```

Visit:
- **Storefront**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/admin

### Build for Production

```bash
# Build both frontend and CMS
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
portal-mini-store/
├── cms/                          # Payload CMS configuration
│   ├── collections/             # CMS content types
│   │   ├── Products.ts         # Product management
│   │   ├── Categories.ts       # Product categories
│   │   ├── Orders.ts           # Order management
│   │   ├── Media.ts            # File uploads
│   │   └── Users.ts            # User management
│   └── payload.config.ts       # CMS configuration
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   └── ...                 # Other pages
│   ├── components/             # React components
│   │   ├── Header.tsx          # Site header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── FeaturedProducts.tsx # Product showcase
│   │   ├── Footer.tsx          # Site footer
│   │   └── ui/                 # Shadcn/UI components
│   └── lib/                    # Utilities
│       └── utils.ts            # Helper functions
├── public/                     # Static assets
├── package.json                # Dependencies
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
└── README.md                   # Documentation
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Accessible component library
- **Radix UI**: Low-level UI primitives

### Backend & Database
- **Payload CMS**: Headless content management system
- **Neon Database**: Serverless PostgreSQL
- **Drizzle ORM**: Type-safe database queries
- **Stripe**: Payment processing

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## 🎨 CMS Features

### Content Management

**Products Collection:**
- Product information (name, description, price)
- Inventory management with stock tracking
- Product images and variants
- Categories and tags
- SEO metadata

**Categories Collection:**
- Hierarchical category structure
- Category images and descriptions
- SEO-friendly slugs

**Orders Collection:**
- Complete order lifecycle management
- Customer information and shipping addresses
- Payment status tracking
- Order notes and history

**Media Collection:**
- File upload management
- Automatic image resizing
- Alt text and metadata

### Admin Panel

Access the CMS admin panel at `/admin` to:
- Manage products, categories, and orders
- Upload and organize media files
- Configure site settings
- Manage user accounts

## 🛒 E-commerce Features

### Storefront

- **Product Catalog**: Browse products by category
- **Product Search**: Full-text search functionality
- **Shopping Cart**: Persistent cart with local storage
- **User Accounts**: Registration and authentication
- **Order History**: View past orders and status
- **Wishlist**: Save favorite products

### Checkout Process

- **Multi-step Checkout**: Guided purchase flow
- **Shipping Calculator**: Dynamic shipping rates
- **Payment Integration**: Stripe payment processing
- **Order Confirmation**: Email notifications
- **Guest Checkout**: No account required

### Admin Features

- **Order Management**: Process and fulfill orders
- **Inventory Tracking**: Automatic stock updates
- **Sales Analytics**: Revenue and performance metrics
- **Customer Management**: User accounts and data
- **Content Management**: Update site content

## 💳 Payment Integration

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the dashboard
3. Add keys to environment variables
4. Configure webhook endpoints for order updates

### Supported Payment Methods

- Credit cards (Visa, MasterCard, American Express)
- Digital wallets (Apple Pay, Google Pay)
- Bank transfers and ACH
- International payments

## 🎨 Customization

### Theming

Customize the design using Tailwind CSS:

```css
/* src/app/globals.css */
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* Add your custom colors */
}
```

### Components

Extend Shadcn/UI components:

```tsx
// src/components/ui/custom-button.tsx
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gradient" | "glass"
}

const CustomButton = ({ className, variant, ...props }: CustomButtonProps) => {
  return (
    <Button
      className={cn(
        variant === "gradient" && "bg-gradient-to-r from-purple-500 to-pink-500",
        variant === "glass" && "bg-white/10 backdrop-blur-md border-white/20",
        className
      )}
      {...props}
    />
  )
}

export { CustomButton }
```

### Content Types

Add custom fields to Payload collections:

```typescript
// cms/collections/Products.ts
export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    // Existing fields...
    {
      name: 'customField',
      type: 'text',
      label: 'Custom Field',
    },
  ],
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Railway

```bash
# Connect GitHub repository
# Railway auto-detects Next.js
# Add Neon database connection
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Required for production:

```bash
DATABASE_URL="postgresql://..."
PAYLOAD_SECRET="your-secret-key"
NEXT_PUBLIC_SERVER_URL="https://your-domain.com"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
```

## 🔧 Development

### Scripts

```bash
# Development
npm run dev              # Start development server
npm run cms:dev          # Start CMS only

# Database
npm run db:generate      # Generate Drizzle schema
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # Type checking
```

### Adding New Features

1. **Frontend Pages**: Create new routes in `src/app/`
2. **CMS Collections**: Add new collections in `cms/collections/`
3. **Components**: Create reusable components in `src/components/`
4. **API Routes**: Add serverless functions in `src/app/api/`

### Database Schema Updates

```bash
# After modifying collections
npm run db:generate
npm run db:push
```

## 📊 Analytics & Monitoring

### Performance Monitoring

- **Core Web Vitals**: Built-in Next.js metrics
- **Bundle Analysis**: Analyze bundle sizes
- **Error Tracking**: Sentry integration ready

### Business Analytics

- **Sales Reports**: Revenue and order analytics
- **Customer Insights**: User behavior and preferences
- **Inventory Reports**: Stock levels and trends
- **Marketing Metrics**: Campaign performance

## 🔒 Security

### Authentication

- **Payload Auth**: Built-in user authentication
- **Role-based Access**: Admin and customer roles
- **Session Management**: Secure session handling

### Data Protection

- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Sanitized content rendering
- **CSRF Protection**: Built-in CSRF tokens

### Payment Security

- **PCI Compliance**: Stripe handles sensitive data
- **SSL/TLS**: HTTPS encryption
- **Secure Headers**: Security headers configured

## 📚 Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Neon Database](https://neon.tech/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/)

### Learning Resources

- [Next.js Learn](https://nextjs.org/learn)
- [Payload CMS Tutorials](https://payloadcms.com/docs/getting-started)
- [Stripe Integration Guide](https://stripe.com/docs/development)

### Community

- [Next.js Discord](https://nextjs.org/discord)
- [Payload CMS Discord](https://discord.gg/payload)
- [Vercel Community](https://vercel.community)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

### Areas for Enhancement

- **Multi-language Support**: i18n implementation
- **Advanced Search**: Full-text search with filters
- **Email Integration**: Order confirmations and notifications
- **Admin Dashboard**: Enhanced analytics and reporting
- **Mobile App**: React Native companion app
- **API Documentation**: OpenAPI/Swagger specs

### Development Guidelines

- Follow TypeScript strict mode
- Use Payload CMS best practices
- Implement proper error handling
- Add comprehensive tests
- Document new features

## 📄 License

This template is licensed under the MIT License.

## ⚠️ Experimental Notice

This is an **experimental** template that combines multiple technologies. While functional, it may require additional configuration and testing for production use. Consider it a starting point for building your own e-commerce solution.

---

**Ready to build your online store?** This template provides everything you need to launch a modern, scalable e-commerce platform! 🛒✨
