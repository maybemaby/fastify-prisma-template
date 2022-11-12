import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { build } from "./app";
import { config } from "./config/config";
import { KnownError } from "./utils/errors";

const app = build({
  logger: config[process.env.NODE_ENV ?? "production"].logger,
});

app.register(helmet);
app.register(sensible);

// Returns swagger spec JSON when not in production
if (process.env.NODE_ENV !== "production") {
  app.get("/spec", async (_req, _res) => {
    return app.swagger();
  });
}

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof KnownError) {
    this.log.error(error, "Expected error occurred");
  } else {
    this.log.error(error, "Unexpected error occurred");
  }
  reply.internalServerError();
  process.exit(1);
});

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
