const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");

const fastify = require("fastify")({
  logger: { prettyPrint: { translateTime: "HH:MM:ss Z", ignore: "pid, hostname", colorize: true } },
});

routes.forEach(route => fastify.route(route({ config, services })));

// Hook for API key verification
fastify.addHook("onRequest", (req, reply, done) => {
  if (!req.headers.api_key || req.headers.api_key !== config.apiKey) {
    reply.code(401).send({ message: "Unauthorized" });
  }
  done();
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
