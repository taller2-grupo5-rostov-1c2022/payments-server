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

function handler({ walletService }) {
  return async function (req, reply) {
    verify_role_header(req, reply);
    const userId = req.params.userId;
    const balanceInEthers = await walletService.getBalanceByUserId(userId);
    const code = !balanceInEthers ? 404 : 200;
    const body = !balanceInEthers
      ? { message: `Unable to find wallet with provided uid ${userId} or etherscan is down` }
      : { balance: balanceInEthers };
    reply.code(code).send(body);
  };
}

module.exports = { handler, schema };
