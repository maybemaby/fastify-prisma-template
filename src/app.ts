import swagger from "@fastify/swagger";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, { FastifyServerOptions } from "fastify";
import { apiRouter } from "./routes/api";
import { healthRoute } from "./routes/health";

export function build(opts?: FastifyServerOptions) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  app.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Prisma Template",
        description: "Swagger Spec for Fastify web API",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:5000" }],
    },
    refResolver: {
      buildLocalReference(json, baseUri, fragment, i) {
        return json.$id?.toString() || `def-${i}`;
      },
    },
  });
  void app.register(apiRouter, { prefix: "/api" });
  void app.register(healthRoute);

  return app;
}
