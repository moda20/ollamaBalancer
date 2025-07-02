import { db } from "../db";
import { ollamaServer } from "../db/schema";

export const getAllServers = async () => {
  return db.select().from(ollamaServer);
};
