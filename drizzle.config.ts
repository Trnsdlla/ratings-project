import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
        //     using url doesn't work because it seems to override the ssl config
        // url: process.env.DATABASE_URL!,
        host: process.env.POSTGRES_HOST!,
        port: parseInt(process.env.POSTGRES_PORT!),
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DATABASE,
        ssl: { rejectUnauthorized: false },
  },
});



// dbCredentials: {
//         using url doesn't work because it seems to override the ssl config
//         url: process.env.DATABASE_URL!,
//         host: process.env.DATABASE_HOST!,
//         port: parseInt(process.env.DATABASE_PORT!),
//         user: process.env.DATABASE_USER!,
//         password: process.env.DATABASE_PASSWORD!,
//         database: process.env.DATABASE_NAME!,
//         ssl: { ca: process.env.DATABASE_CA! },
//     },