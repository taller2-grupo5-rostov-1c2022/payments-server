const { findByUserId } = require("../postgres/repositories/wallet_repository");

function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
      },
    },
    required: ["userId"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    console.log("ws", walletService);
    const wallet = await findByUserId(req.params.userId);
    const code = !wallet ? 404 : 200;
    const body = !wallet
      ? { status: "error", message: "Unable to find wallet with provided user" }
      : { status: "success", data: wallet };
    reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
