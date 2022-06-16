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
    required: ["userId"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    if (!req.headers.role || req.headers.role !== "admin") {
      reply.code(403).send({ message: "Unauthorized, role is not admin" });
    }
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
