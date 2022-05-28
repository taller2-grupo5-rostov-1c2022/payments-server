const DepositRepository = require("../postgres/repositories/transaction_repository");

const findAll = async () =>
  wrapWithUnknownError(() => DepositRepository.findAll(), "Unable to find all deposits due to unknown error");

const findById = async idDeposit =>
  wrapWithUnknownError(
    () => DepositRepository.findById(idDeposit),
    `Unable to find deposit ${idDeposit} due to unknown error`,
  );

const create = async newDeposit =>
  wrapWithUnknownError(() => DepositRepository.create(newDeposit), `Unable to create deposit due to unknown error`);

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with deposit service due to error", err);
    return { kind: "UNKNOWN_ERROR", message };
  });

const findByUserId = async ({ userId }) =>
  wrapWithUnknownError(
    () => DepositRepository.findByUserId({ userId }),
    `Unable to find deposit due to unknown error`,
  );

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
};
