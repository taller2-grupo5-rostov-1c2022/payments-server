import { ApiError } from "../errors";
const DepositRepository = require("../postgres/repositories/deposit_repository");

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
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });

const findByWalletId = async ({ walletId, month, year }) =>
  wrapWithUnknownError(
    () => DepositRepository.findByWalletId({ walletId, month, year }),
    `Unable to find deposit due to unknown error`,
  );

module.exports = {
  findAll,
  findById,
  findByWalletId,
  create,
};
