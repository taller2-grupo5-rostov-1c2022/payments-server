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
  return async function (req) {
    const userId = req.params.userId;
    const walletId = await walletService.getWalletIdWithUserId(userId);
    if (!walletId) {
      return {
        statusCode: 404,
        body: {
          message: "User ID not found",
        },
      };
    }
    return await contractInteraction.deposit(
      await walletService.getWallet(walletId),
      req.body.amountInEthers,
      userId,
    );
  };
}

module.exports = { schema, handler };
