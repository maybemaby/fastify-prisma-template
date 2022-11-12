import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, { FastifyServerOptions } from "fastify";
import { apiRouter } from "./routes/api";
import { healthRoute } from "./routes/health";

export function build(opts?: FastifyServerOptions) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();
  app.register(apiRouter, { prefix: "/api" });
  app.register(healthRoute);

  return app;
}
