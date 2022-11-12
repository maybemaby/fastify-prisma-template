import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, { FastifyServerOptions } from "fastify";

export function build(opts: FastifyServerOptions) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  return app;
}
