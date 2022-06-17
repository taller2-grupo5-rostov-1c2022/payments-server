const { verify_role_header } = require("./utils");
const { Role } = require("./schemas");

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
    headers: Role,
    required: ["userId", "role"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    verify_role_header(req, reply);
    const body = await contractInteraction.getDepositReceipt(req.params.userId);
    const actualCode = body ? 200 : 404;
    reply.code(actualCode).send(body);
  };
}

module.exports = { handler, schema };
