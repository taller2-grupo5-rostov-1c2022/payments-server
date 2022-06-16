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
    headers: {
      type: "object",
      properties: {
        role: { type: "string", enum: ["admin", "listener", "artist"] },
      },
    },
    required: ["userId", "amountInEthers", "role"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    if (!req.headers.role || req.headers.role !== "admin") {
      reply.code(403).send({ message: "Unauthorized, role is not admin" });
    }
    const userId = req.params.userId;
    const walletId = await walletService.getWalletIdWithUserId(userId);
    if (!walletId) {
      return reply.code(404).send({ message: `Unable to find wallet with provided user id ${userId}` });
    }
    const deployerWallet = await walletService.getDeployerWallet();
    const receiverWallet = await walletService.getWallet(walletId);
    try {
      return await contractInteraction.pay(deployerWallet, receiverWallet.address, req.body.amountInEthers, userId);
    } catch (e) {
      return reply.code(400).send({
        message: `System wallet does not have sufficient funds to make a payment`,
      });
    }
  };
}

module.exports = { schema, handler };
