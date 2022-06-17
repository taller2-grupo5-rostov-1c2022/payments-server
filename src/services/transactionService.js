const TransactionRepository = require("../postgres/repositories/transactionRepository");

const findAll = async () =>
  wrapWithUnknownError(() => TransactionRepository.findAll(), "Unable to find all transactions due to unknown error");

const findById = async transactionId =>
  wrapWithUnknownError(
    () => TransactionRepository.findById(transactionId),
    `Unable to find transaction ${transactionId} due to unknown error`,
  );

const create = async newTransaction =>
  wrapWithUnknownError(
    () => TransactionRepository.create(newTransaction),
    `Unable to create transaction due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with transaction service due to error", err);
    return { kind: "UNKNOWN_ERROR", message };
  });

const findByUserId = async ({ userId }) =>
  wrapWithUnknownError(
    () => TransactionRepository.findByUserId({ userId }),
    `Unable to find transaction due to unknown error`,
  );

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
};
