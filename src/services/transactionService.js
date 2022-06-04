const TransactionDepository = require("../postgres/repositories/transactionRepository");

const findAll = async () =>
  wrapWithUnknownError(() => TransactionDepository.findAll(), "Unable to find all deposits due to unknown error");

const findById = async idDeposit =>
  wrapWithUnknownError(
    () => TransactionDepository.findById(idDeposit),
    `Unable to find deposit ${idDeposit} due to unknown error`,
  );

const create = async newTransaction =>
  wrapWithUnknownError(
    () => TransactionDepository.create(newTransaction),
    `Unable to create deposit due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with deposit service due to error", err);
    return { kind: "UNKNOWN_ERROR", message };
  });

const findByUserId = async ({ userId }) =>
  wrapWithUnknownError(
    () => TransactionDepository.findByUserId({ userId }),
    `Unable to find deposit due to unknown error`,
  );

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
};
