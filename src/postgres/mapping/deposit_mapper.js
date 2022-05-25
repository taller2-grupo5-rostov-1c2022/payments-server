const mapToDeposit = depositEntity => {
  return {
    id: depositEntity.id,
    wallet_id: depositEntity.wallet_id,
    sender_address: depositEntity.sender_address,
    amount: depositEntity.amount,
    month: depositEntity.month,
    year: depositEntity.year,
  };
};

const mapToDepositArray = depositsEntities => {
  const deposits = [];

  for (const depositEntity of depositsEntities) {
    deposits.push(mapToDeposit(depositEntity));
  }

  return deposits;
};

module.exports = {
  mapToDeposit,
  mapToDepositArray,
};
