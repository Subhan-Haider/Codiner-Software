#!/usr/bin/env node

/**
 * Setup script for Portal Mini Store
 * Helps configure Neon database connection
 */

const fs = require('fs');
const path = require('path');

console.log('🛍️  Portal Mini Store Setup');
console.log('==========================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExample = `# Database Configuration
# Get your Neon database URL from https://neon.tech/
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# Payload CMS Configuration
PAYLOAD_SECRET="${generateSecret()}"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# Stripe Configuration (Optional)
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"

# NextAuth Configuration (Optional)
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"`;

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env.local created successfully!');
  console.log('⚠️  Please update DATABASE_URL with your Neon connection string\n');
} else {
  console.log('ℹ️  .env.local already exists');
}

console.log('🚀 Next Steps:');
console.log('1. Visit https://neon.tech and create a free account');
console.log('2. Create a new project and copy the connection string');
console.log('3. Update DATABASE_URL in .env.local');
console.log('4. Run: npm install');
console.log('5. Run: npm run db:generate');
console.log('6. Run: npm run db:push');
console.log('7. Run: npm run dev');
console.log('\n🎉 Happy coding!\n');

function generateSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}
