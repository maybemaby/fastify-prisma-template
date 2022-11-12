import swagger from "@fastify/swagger";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { build } from "./app";
import { config } from "./config/config";

const app = build({
  logger: config[process.env.NODE_ENV ?? "production"].logger,
});

app.register(swagger, {
  swagger: {
    info: {
      title: "Fastify Prisma Template",
      description: "Swagger Spec for Fastify web API",
      version: "0.1.0",
    },
    host: "localhost",
  },
});
app.register(helmet);
app.register(sensible);

// Returns swagger spec JSON when not in production
if (process.env.NODE_ENV !== "production") {
  app.get("/spec", async (_req, _res) => {
    return app.swagger();
  });
}

app.listen(
  {
    port: 3000,
  },
  (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);
