import { Deposit } from '../../models/deposit';

export interface DepositEntity {
  id?: string;
  wallet_id: string;
  sender_address: string;
  amount: string;
  month: string;
  year: string;
}

export const mapToDeposit = (depositEntity: DepositEntity): Deposit => {
  return {
    id: depositEntity.id,
    wallet_id: depositEntity.wallet_id,
    sender_address: depositEntity.sender_address,
    amount: depositEntity.amount,
    month: depositEntity.month,
    year: depositEntity.year,
  };
};

export const mapToDepositArray = (DepositsEntities: DepositEntity[]): Deposit[] => {
  const deposits = [];

  for (const DepositEntity of DepositsEntities) {
    deposits.push(mapToDeposit(DepositEntity));
  }

  return deposits;
};
