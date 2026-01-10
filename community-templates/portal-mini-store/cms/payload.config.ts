import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Collections
import { Users } from './collections/Users';
import { Products } from './collections/Products';
import { Categories } from './collections/Categories';
import { Orders } from './collections/Orders';
import { Media } from './collections/Media';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Products, Categories, Orders, Media],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
