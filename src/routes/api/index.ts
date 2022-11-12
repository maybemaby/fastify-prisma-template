import { FastifyPluginAsync } from "fastify";

export const apiRouter: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async (req, res) => {
    return { version: "1" };
  });
};
