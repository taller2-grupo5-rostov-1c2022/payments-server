const ethers = require("ethers");
const transactions = require("./transactionService");
const { findByUserId } = require("../postgres/repositories/walletRepository");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend, userId) => {
  const date = new Date();
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        const someDeposit = await transactions.create({
          id: tx.hash.toString(),
          amount: parseFloat(amountToSend),
          user_id: userId,
          receiver_address: tx.to,
          sender_address: tx.from,
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        });
        console.log("Persisted deposit", JSON.stringify(someDeposit));
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const pay = ({ config }) => async (systemWallet, receiverAddress, amountToSend, userId) => {
  const date = new Date();
  const basicPayments = await getContract(config, systemWallet);
  const tx = await basicPayments.sendPayment(receiverAddress, ethers.utils.parseEther(amountToSend).toHexString());
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {
        const somePayment = await transactions.create({
          id: tx.hash.toString(),
          amount: parseFloat(amountToSend),
          user_id: userId,
          receiver_address: receiverAddress,
          sender_address: config.contractAddress,
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        });
        console.log("Persisted deposit", JSON.stringify(somePayment));
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  tx.to = receiverAddress;
  tx.from = config.contractAddress;
  return tx;
};

const getDepositReceipt = ({}) => async userId => {
  const wallet = await findByUserId(userId);
  if (!wallet) {
    return { status: "error", code: 404, message: `Wallet not found for user with id ${userId}` };
  } else {
    return await transactions.findByUserId({ userId });
  }
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  pay: pay(dependencies),
});
