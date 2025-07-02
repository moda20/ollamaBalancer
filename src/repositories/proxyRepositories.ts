import { Proxy } from "@models/proxy";
import { db } from "../db";
import { Proxy as ProxySchema } from "@db/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const addProxy = (proxy: Proxy) => {
  return db.insert(ProxySchema).values([proxy]);
};

export const getProxy = (id: number) => {
  return db.select().from(ProxySchema).where(eq(ProxySchema.id, id));
};

export const getAllProxies = () => {
  const { password, userName, ...rest } = getTableColumns(ProxySchema);
  return db.select({ ...rest }).from(ProxySchema);
};
