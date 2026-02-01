import { defineConfig } from "drizzle-kit";

import * as dotenv from "dotenv";

// Only load .env.local if DATABASE_URL is not already set (Railway sets it)
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.local" });
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  migrations: {
    table: "drizzle_migrations",
    schema: "public",
  },
});
