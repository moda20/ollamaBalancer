import { addProxy, getAllProxies } from "../../repositories/proxyRepositories";
import { t } from "elysia";
import { createElysia } from "@utils/createElysia";

export const proxyController = createElysia({ prefix: "/proxy" })
  .post(
    "/addProxy",
    async ({ body }) => {
      await addProxy(body);
      return true;
    },
    {
      body: t.Object({
        ip: t.String(),
        port: t.Number(),
        protocol: t.String({ default: "http" }),
        name: t.String(),
        status: t.Boolean({
          default: true,
        }),
        userName: t.Optional(t.String()),
        password: t.Optional(t.String()),
      }),
    },
  )
  .get("/allProxies", () => {
    return getAllProxies();
  });
