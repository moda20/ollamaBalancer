import md5 from "md5";
import { getAllServers } from "../repositories/ollamaServersRepository";
import { IOllamaServer } from "@models/ollamaServer";
import { Proxy } from "@models/proxy";

export const runningServers: {
  [key: string]: {
    server: IOllamaServer;
    serverId: string;
  };
} = {};

export const ServerInstances: {
  [key: string]: {
    server: IOllamaServer;
    serverId: string;
    proxy?: Proxy;
  };
} = {};

export const setUpServers = async () => {
  const servers = await getAllServers();
  servers.forEach((item) => {
    runningServers[md5(item.host)] = {
      server: item,
      serverId: md5(item.host),
    };
  });
};
export const getRandomServer = ({
  models,
  size,
}: { models?: string | string[]; size?: number } = {}) => {
  const modelFilterList = models && Array.isArray(models) ? models : [models];
  const filteredServers = Object.keys(runningServers).filter((serverId) => {
    const server = runningServers[serverId];
    return server.server.models?.some((model) => {
      if (models) {
        return modelFilterList.includes(model.name);
      }
      if (size) {
        return Number(model.details?.parameter_size?.replace(/B/g, "")) > size;
      }
    });
  });
  const targetServer =
    filteredServers[Math.floor(Math.random() * filteredServers.length)];

  return runningServers[targetServer];
};

export const getRandomServerWithProxy = ({
  models,
  size,
  proxy,
}: { models?: string | string[]; size?: number; proxy?: Proxy } = {}) => {
  const targetServer = getRandomServer({ models, size });
  let targetId = targetServer.serverId;
  if (proxy) {
    targetId = md5(
      `${targetServer.serverId}_${proxy.name}_${Math.random() * 10000}`,
    );
  }
  ServerInstances[targetId] = {
    server: targetServer.server,
    serverId: targetId,
    proxy: proxy,
  };
  return targetId;
};
