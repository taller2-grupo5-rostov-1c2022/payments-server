const TransactionRepository = require("../infrastructure/repositories/transactionRepository");

const findAll = async () => await TransactionRepository.findAll();

const findById = async transactionId => await TransactionRepository.findById(transactionId);

const create = async newTransaction => await TransactionRepository.create(newTransaction);

const findByUserId = async ({ userId }) => await TransactionRepository.findByUserId({ userId });

module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
};
