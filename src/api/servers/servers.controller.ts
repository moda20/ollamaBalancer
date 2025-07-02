import { createElysia } from "@utils/createElysia";
import {
  getRandomServerWithProxy,
  ServerInstances,
} from "@services/ollamaServers";
import { join } from "path";
import axios from "axios";
import { getProxy } from "../../repositories/proxyRepositories";

export const serversController = createElysia({ prefix: "/servers" })
  .get("/getServer", async ({ query }) => {
    const { models, size, proxy } = query;
    const targetProxy = await getProxy(Number(proxy));
    const serverID = getRandomServerWithProxy({
      models,
      size: Number(size),
      proxy: targetProxy[0],
    });
    return serverID;
  })
  .all("/ollama/*", async ({ request, query, path, headers }) => {
    const axiosInstance = axios.create();
    const parsedPath = new URL(path, "http://localhost:8080");
    parsedPath.search = "";
    let targetPath = parsedPath.pathname.replace(/^\/servers\/ollama/, "");
    let serverId = query.serverId;
    if (!serverId) {
      //get serverId from path
      const splitServerId = targetPath.split("/")?.[1];
      if (splitServerId.length === 32) {
        serverId = splitServerId;
        targetPath = targetPath.replace(`/${splitServerId}`, "");
      }
    }
    if (!serverId) {
      throw new Error("serverId not found");
    }
    const targetServer = ServerInstances[serverId];

    if (!targetServer) {
      throw new Error("server not found");
    }
    const targetUrl = `http://${join(`${targetServer.server.host}:${targetServer.server.port}`, targetPath)}`;
    console.log("targetUrl", targetUrl);
    if (targetServer.proxy) {
      axiosInstance.defaults.proxy = {
        host: targetServer.proxy.ip,
        port: targetServer.proxy.port,
        protocol: targetServer.proxy.protocol ?? undefined,
        auth: undefined,
      };
    }

    const method = request.method;
    const contentType = headers?.["content-type"] || "";

    let data: any = null;
    if (method !== "GET" && method !== "HEAD") {
      if (contentType.includes("application/json")) {
        data = await request.json();
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        data = await request.formData();
      } else {
        data = await request.text();
      }
    }

    try {
      const res = await axiosInstance({
        url: targetUrl,
        method,
        headers: headers,
        data,
        validateStatus: () => true,
      });

      return res.data;
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: "Proxy error", detail: err.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  });
