const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getTransactionHandler");
const getDeposits = require("./handlers/getTransactionsHandler");
const createPayment = require("./handlers/createPaymentHandler");
const getBalance = require("./handlers/getBalanceHandler");
const getBalancePath = require("./handlers/getBalancePathHandler");

const API_PREFIX = "/api/v1";

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/wallets",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/wallets/:userId",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: API_PREFIX + "/wallets/:userId",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: API_PREFIX + "/deposit/:userId",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function getUserDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/transactions/:userId",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function getTransactionsRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/transactions",
    schema: getDeposits.schema(config),
    handler: getDeposits.handler({ config, ...services }),
  };
}

function createPaymentRoute({ services, config }) {
  return {
    method: "POST",
    url: API_PREFIX + "/pay/:userId",
    schema: createPayment.schema(config),
    handler: createPayment.handler({ config, ...services }),
  };
}

function getBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/balances/",
    schema: getBalance.schema(config),
    handler: getBalance.handler({ config, ...services }),
  };
}

function getBalanceUserIdPathRoute({ services, config }) {
  return {
    method: "GET",
    url: API_PREFIX + "/balances/:userId",
    schema: getBalancePath.schema(config),
    handler: getBalancePath.handler({ config, ...services }),
  };
}

module.exports = [
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  createDepositRoute,
  getUserDepositRoute,
  getTransactionsRoute,
  createPaymentRoute,
  getBalanceRoute,
  getBalanceUserIdPathRoute,
];
