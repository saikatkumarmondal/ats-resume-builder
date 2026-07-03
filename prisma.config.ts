import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
    // if you had a directUrl before (e.g. pgBouncer pooling), put it here too:
    // shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
  },
});