const { findAll } = require("../postgres/repositories/transactionRepository");

function schema() {
  return {
    params: {
      type: "object",
    },
    headers: {
      type: "object",
      properties: {
        role: { type: "string", enum: ["admin", "listener", "artist"] },
      },
    },
    required: ["role"],
  };
}

function handler() {
  return async function (req, reply) {
    if (!req.headers.role || req.headers.role !== "admin") {
      reply.code(403).send({ message: "Unauthorized, role is not admin" });
    }
    const allDeposits = await findAll();
    reply.code(200).send(allDeposits);
  };
}

module.exports = { handler, schema };
