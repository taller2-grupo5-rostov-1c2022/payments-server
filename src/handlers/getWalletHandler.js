const { findByUserId } = require("../infrastructure/repositories/walletRepository");

function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    required: ["userId"],
  };
}

function handler({}) {
  return async function (req, reply) {
    const wallet = await findByUserId(req.params.userId);
    const code = !wallet ? 404 : 200;
    const body = !wallet ? { message: `Unable to find wallet with provided user id ${req.params.userId}` } : wallet;
    reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
