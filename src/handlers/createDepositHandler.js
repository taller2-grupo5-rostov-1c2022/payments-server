function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["userId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    const userId = req.params.userId;
    const walletId = await walletService.getWalletIdWithUserId(userId);
    if (!walletId) {
      return reply.code(404).send({
        message: `User ID ${userId} not found`,
      })
    }
    try {
      return await contractInteraction.deposit(await walletService.getWallet(walletId), req.body.amountInEthers, userId);
    }
    catch (e) {
      return reply.code(400).send({
        message: `User ID ${userId} does not have sufficient funds to make a deposit`,
      })
    }
  };
}

module.exports = { schema, handler };
