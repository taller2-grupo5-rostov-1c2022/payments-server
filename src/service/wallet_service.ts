import { ApiError } from "../errors";
import { Wallet } from "../models/wallet";
import * as WalletRepository from "../postgres/repositories/wallet_repository";

export const findAll = async (): Promise<Wallet[] | ApiError> =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all wallets due to unknown error");

export const findById = async (walletId: number): Promise<Wallet[] | ApiError> =>
  wrapWithUnknownError(
    () => WalletRepository.findById(walletId),
    `Unable to find wallet with id ${walletId} due to unknown error`,
  );

export const create = async (newWalletDto: Wallet): Promise<Wallet | ApiError> =>
  wrapWithUnknownError(
    () => WalletRepository.create(newWalletDto),
    `Unable to create wallet ${newWalletDto} due to unknown error`,
  );

const wrapWithUnknownError = (process: () => Promise<any>, message: string) =>
  process().catch((err: any) => {
    console.error("Unable to operate with payments service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });

export const countWallet = (process: () => Promise<any>, message: string) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);
