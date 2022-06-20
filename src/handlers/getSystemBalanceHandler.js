const { Role } = require("./schemas");

function schema() {
  return {
    headers: Role,
    required: ["role"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
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
