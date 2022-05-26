import { ApiError } from "../errors";
const WalletRepository = require("../postgres/repository/wallet_repository");

const findAll = async () =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all wallets due to unknown error");

const findById = async walletId =>
  wrapWithUnknownError(
    () => WalletRepository.findById(walletId),
    `Unable to find wallet with id ${walletId} due to unknown error`,
  );

const findByUserId = async userId =>
  wrapWithUnknownError(
    () => WalletRepository.findByUserId(userId),
    `Unable to find wallets for user with id ${userId} due to unknown error`,
  );

const create = async newWalletDto =>
  wrapWithUnknownError(
    () => WalletRepository.create(newWalletDto),
    `Unable to create wallet ${newWalletDto} due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with payments service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });

const countWallet = (process, message) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
  countWallet,
};
