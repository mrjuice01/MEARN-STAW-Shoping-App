import { env } from "@/env.mjs"
import type { Config } from "drizzle-kit"

export default {
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config
