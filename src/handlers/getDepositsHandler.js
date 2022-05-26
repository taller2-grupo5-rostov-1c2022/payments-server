const { findAll } = require('../postgres/repositories/deposit_repository');

function schema() {
  return {
    params: {
      type: "object",
    }
  };
}

function handler() {
  return async function (req, reply) {
    const allDeposits = await findAll()
    // const actualCode = !!code ? code : body.status && body.status === "error" ? 400 : 200;
    reply.code(200).send(allDeposits);
  };
}

module.exports = { handler, schema };
