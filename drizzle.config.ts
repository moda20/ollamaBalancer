import { defineConfig } from "drizzle-kit";
import config from "@config/config";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: config.get("db.host"),
    port: config.get("db.port"),
    user: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.database"),
  },
});
