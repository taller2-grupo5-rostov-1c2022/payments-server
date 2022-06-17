function schema() {
  return {
    headers: {
      type: "object",
      properties: {
        role: { type: "string", enum: ["admin", "listener", "artist"] },
      },
    },
    required: ["role"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    if (!req.headers.role || req.headers.role !== "admin") {
      reply.code(403).send({ message: "Unauthorized, role is not admin" });
    }
    const userId = req.params.userId;
    const result = await walletService.getBalanceContract();
    const code = !result ? 404 : 200;
    const body = !result
      ? { message: `Unable to find wallet with provided uid ${userId} or etherscan is down` }
      : result;
    reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
