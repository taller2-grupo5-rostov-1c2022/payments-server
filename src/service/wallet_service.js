import { ApiError } from "../errors";
import { Wallet } from "../models/wallet";
import * as WalletRepository from "../postgres/repositories/wallet_repository";

export const findAll = async () =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all wallets due to unknown error");

export const findById = async walletId =>
  wrapWithUnknownError(
    () => WalletRepository.findById(walletId),
    `Unable to find wallet with id ${walletId} due to unknown error`,
  );

export const create = async newWalletDto =>
  wrapWithUnknownError(
    () => WalletRepository.create(newWalletDto),
    `Unable to create wallet ${newWalletDto} due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with payments service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });

export const countWallet = (process, message) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);
