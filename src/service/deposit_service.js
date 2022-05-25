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


module.exports = {
  findAll,
  findById,
  create,
};
