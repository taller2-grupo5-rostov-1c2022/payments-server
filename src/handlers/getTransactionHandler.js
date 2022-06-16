function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
      },
    },
    headers: {
      type: "object",
      properties: {
        role: { type: "string", enum: ["admin", "listener", "artist"] },
      },
    },
    required: ["userId", "role"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    if (!req.headers.role || req.headers.role !== "admin") {
      reply.code(403).send({ message: "Unauthorized, role is not admin" });
    }
    const body = await contractInteraction.getDepositReceipt(req.params.userId);
    const actualCode = body ? 200 : 404;
    reply.code(actualCode).send(body);
  };
}

module.exports = { handler, schema };
