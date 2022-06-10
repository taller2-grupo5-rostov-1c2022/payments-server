function schema() {
  return {
    headers: {
      type: "object",
      properties: {
        "user-id": {
          type: "string",
        },
      },
    },
    required: ["user-id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const userId = req.headers["user-id"];
    const balanceInEthers = await walletService.getBalanceByUserId(userId);
    const code = !balanceInEthers ? 404 : 200;
    const body = !balanceInEthers ? { message: `Unable to find wallet with provided user id ${userId}` } : { 'balance': balanceInEthers };
    return reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
