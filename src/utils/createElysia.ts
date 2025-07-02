import { Elysia } from "elysia";
import qs from "qs";
export const createElysia = (
  config?: ConstructorParameters<typeof Elysia>[0],
) =>
  new Elysia({ ...config, aot: process.env.RUNTIME === "bun" }).onTransform(
    (ctx) => {
      // @ts-ignore
      ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
    },
  );
