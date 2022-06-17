function schema() {
  return {
    headers: {
      type: "object",
      properties: {
        uid: {
          type: "string",
        },
      },
    },
    required: ["uid"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const userId = req.headers["uid"];
    const balanceInEthers = await walletService.getBalanceByUserId(userId);
    const code = !balanceInEthers ? 404 : 200;
    const body = !balanceInEthers
      ? { message: `Unable to find wallet with provided uid ${userId} or etherscan is down` }
      : { balance: balanceInEthers };
    reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
