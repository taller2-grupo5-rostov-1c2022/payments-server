const { findAll } = require("../postgres/repositories/transactionRepository");
const { verify_role_header } = require("./utils");
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
    verify_role_header(req, reply);
    const allDeposits = await findAll();
    reply.code(200).send(allDeposits);
  };
}

module.exports = { handler, schema };
