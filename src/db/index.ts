import config from "@config/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle({
  connection: {
    host: config.get("db.host"),
    port: config.get("db.port"),
    user: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.database"),
  },
});
