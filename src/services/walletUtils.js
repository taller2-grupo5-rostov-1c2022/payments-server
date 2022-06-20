const WalletRepository = require("../infrastructure/repositories/walletRepository");

const findAll = async () => await WalletRepository.findAll();

const findById = async walletId => await WalletRepository.findById(walletId);

const findByUserId = async userId => await WalletRepository.findByUserId(userId);

const create = async newWalletDto => await WalletRepository.create(newWalletDto);

const countWallet = async () => await WalletRepository.count();

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
  countWallet,
};
