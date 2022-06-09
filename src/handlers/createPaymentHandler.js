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
      return {
        statusCode: 404,
        body: {
          message: `User ID ${userId} not found`,
        },
      };
    }
    const deployerWallet = await walletService.getDeployerWallet();
    const receiverWallet = await walletService.getWallet(walletId);
    try {
      return await contractInteraction.pay(deployerWallet, receiverWallet.address, req.body.amountInEthers, userId);
    }
    catch (e) {
      return reply.code(400).send({
        message: `System wallet does not have sufficient funds to make a payment`,
      });
    }
  };
}

module.exports = { schema, handler };
