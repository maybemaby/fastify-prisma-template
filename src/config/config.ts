import { FastifyServerOptions } from "fastify";

interface IConfig {
  logger: FastifyServerOptions["logger"];
}

export const config: Record<string, IConfig> = {
  dev: {
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
        },
      },
      level: "debug",
    },
  },
  production: {
    logger: {
      serializers: {
        req(req) {
          return {
            method: req.method,
            url: req.url,
          };
        },
      },
      level: "info",
    },
  },
  test: { logger: false },
};