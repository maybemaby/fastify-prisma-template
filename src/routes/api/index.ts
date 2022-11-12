import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";

export const apiRouter: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: Type.Object(
            {
              version: Type.String(),
            },
            {
              description: "API Information",
            }
          ),
        },
      },
    },
    async (_req, _res) => {
      return { version: "1" };
    }
  );
};
