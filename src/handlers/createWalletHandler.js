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

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.params.userId);
    const code = body ? 200 : 409;
    const response = body ? body : { message: `Wallet already exists for that userId ${req.params.userId}` };
    return reply.code(code).send(response);
  };
}

module.exports = { handler, schema };
