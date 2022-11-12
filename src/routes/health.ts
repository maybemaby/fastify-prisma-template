import { FastifyPluginAsync } from "fastify";

export const healthRoute: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/heartbeat", async (req, res) => {
    res.statusCode = 200;
    return {
      health: "Good",
    };
  });
};
