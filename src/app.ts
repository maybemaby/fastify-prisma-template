import fastify, { FastifyServerOptions } from "fastify";

export function build(opts: FastifyServerOptions) {
  const app = fastify(opts);

  return app;
}
