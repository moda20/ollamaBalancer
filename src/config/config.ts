import { walk } from "@utils/convictUtils";
import convict from "convict";
import { ipaddress } from "convict-format-with-validator";

convict.addFormat(ipaddress);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  appName: {
    doc: "The application name.",
    default: "scheduler_backend",
    env: "APP_NAME",
  },
  swaggerServer: {
    doc: "Whether to enable swagger server or not.",
    default: true,
    format: Boolean,
    env: "ENABLE_SWAGGER_SERVER",
  },
  server: {
    ip: {
      doc: "The server ip.",
      format: "ipaddress",
      default: "0.0.0.0",
      env: "IP",
    },
    port: {
      doc: "The server port.",
      format: "port",
      default: 8080,
      env: "PORT",
    },
    logToConsole: {
      doc: "Whether to log to console.",
      format: Boolean,
      default: true,
      env: "LOG_TO_CONSOLE",
    },
  },
  db: {
    host: {
      doc: "Database host",
      format: String,
      default: "localhost",
      env: "DB_HOST",
    },
    port: {
      doc: "Database port",
      format: Number,
      default: 3306,
      env: "DB_PORT",
    },
    username: {
      doc: "Database user",
      format: String,
      default: "",
      env: "DB_USERNAME",
    },
    password: {
      doc: "Database password",
      format: String,
      default: "",
      env: "DB_PASSWORD",
    },
    database: {
      doc: "Database name",
      format: String,
      default: "",
      env: "DB_DATABASE",
    },
  },
});

type extendedConvict = typeof config & {
  removeKey: (key: string) => void;
  _instance: any;
};

const extendedConfig = config as extendedConvict;

extendedConfig.removeKey = function (key: string) {
  const keySplit = key.split(".");
  const targetKey = keySplit.pop();
  const targetPath = keySplit.join(".");
  if (targetKey) {
    const targetObject = walk(this._instance, targetPath, false);
    delete targetObject[targetKey];
  }
};

export default extendedConfig;
