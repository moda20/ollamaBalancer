import { createElysia } from "@utils/createElysia";
import { serversController } from "./servers/servers.controller";
import { proxyController } from "./servers/proxy.controller";

export const apiRoutes = createElysia();

apiRoutes.use(serversController);
apiRoutes.use(proxyController);
