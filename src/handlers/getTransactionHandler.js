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
    required: ["userId"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getDepositReceipt(req.params.userId);
    const actualCode = body ? 200 : 404;
    reply.code(actualCode).send(body);
  };
}

module.exports = { handler, schema };
