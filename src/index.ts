import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import config from "@config/config";
import { apiRoutes } from "./api";
import { setUpServers } from "@services/ollamaServers";
import swagger from "@elysiajs/swagger";

const api = new Elysia().get("/", () => "Hello Elysia");

api.use(
  cors({
    origin: () => true,
    credentials: true,
    exposeHeaders: ["Content-Disposition", "*"],
    allowedHeaders: ["content-type"],
    // @ts-ignore
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
  }),
);
api.use(helmet());

// swagger
if (config.get("swaggerServer")) {
  api.use(
    swagger({
      path: "/api-docs",
      documentation: {
        info: {
          title: "ollama balancer API",
          description: "Ollama Balancer API documentation",
          version: "0.0.1",
        },
      },
    }),
  );
}

api.use(apiRoutes);

setUpServers();
api.listen({
  port: config.get("server.port") as number,
  hostname: config.get("server.ip") as string,
});

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${api.server?.port}`,
);
