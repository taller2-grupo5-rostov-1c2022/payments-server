const { findAll } = require("../infrastructure/repositories/transactionRepository");
const { Role } = require("./schemas");

function schema() {
  return {
    params: {
      type: "object",
    },
    headers: Role,
    required: ["role"],
  };
}

function handler() {
  return async function (req, reply) {
    const allDeposits = await findAll();
    reply.code(200).send(allDeposits);
  };
}

module.exports = { handler, schema };
