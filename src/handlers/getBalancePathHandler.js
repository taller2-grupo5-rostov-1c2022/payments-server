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
    const userId = req.params.userId;
    const balanceInEthers = await walletService.getBalanceByUserId(userId);
    const code = !balanceInEthers ? 404 : 200;
    const body = !balanceInEthers
      ? { message: `Unable to find wallet with provided uid ${userId} or etherscan is down` }
      : { balance: balanceInEthers };
    return reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
