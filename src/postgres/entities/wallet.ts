import { Wallet } from "../../models/wallet";

export interface WalletEntity {
  id?: number;
  user_id: string;
  privateKey: string;
  address: string;
}

export const mapToWallet = (walletEntity: WalletEntity): Wallet => {
  return {
    id: walletEntity.id,
    user_id: walletEntity.user_id,
    privateKey: walletEntity.privateKey,
    address: walletEntity.address,
  };
};

export const mapToWalletArray = (walletsEntities: WalletEntity[]): Wallet[] => {
  const wallets = [];

  for (const walletEntity of walletsEntities) {
    wallets.push(mapToWallet(walletEntity));
  }

  return wallets;
};
