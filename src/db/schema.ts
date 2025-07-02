import {
  int,
  mysqlTable,
  serial,
  varchar,
  json,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

export const ollamaServer = mysqlTable("ollamaServers", {
  id: int("id").primaryKey(),
  port: int("port", {}).notNull(),
  host: varchar("host", {
    length: 255,
  })
    .notNull()
    .unique(),
  location: varchar("location", {
    length: 255,
  }).notNull(),
  runner: varchar("runner", {
    length: 255,
  }).notNull(),
  models: json("models").$type<any[]>(),
  lastChecked: timestamp("last_checked"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow().defaultNow(),
});

export const Proxy = mysqlTable("proxy", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  ip: varchar("ip", {
    length: 255,
  }).notNull(),
  port: int("port").notNull(),
  userName: varchar("user_name", {
    length: 255,
  }),
  password: varchar("password", {
    length: 255,
  }),
  protocol: varchar("protocol", {
    length: 255,
  }),
  status: tinyint("status").notNull().$type<boolean>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow().defaultNow(),
});
