const ethers = require("ethers");
const walletsService = require("./walletUtils");
const config = require("../config");
const fetch = require("node-fetch");

const WELCOME_AMOUNT = "0.001";

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  return ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
};

const createWallet = () => async userId => {
  const provider = new ethers.providers.InfuraProvider(config.network, process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const walletsCount = (await walletsService.countWallet()) + 1;
  let result = await walletsService.create({
    id: walletsCount.toString(),
    user_id: userId,
    address: wallet.address,
    private_key: wallet.privateKey,
  });
  if (!result) {
    // Wallet already exists for that user
    result = await walletsService.findByUserId(userId);
  } else {
    // Wallet has just been created, so we send a welcome gift
    await sendWelcomeGift(provider, wallet);
  }
  return result;
};

const getWalletsData = () => () => {
  return walletsService.findAll();
};

const getWalletData = () => walletId => {
  return walletsService.findById(walletId);
};

const getWalletIdWithUserId = async userId => {
  const wallet = await walletsService.findByUserId(userId);
  if (!wallet) {
    return null;
  }
  return wallet.id;
};

const getWallet = async walletId => {
  const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
  return new ethers.Wallet((await getWalletData()(walletId)).private_key, provider);
};

const sendWelcomeGift = async (provider, newWallet) => {
  const walletDeployer = await ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  const basicPayments = getContract(config, walletDeployer);
  const tx = await basicPayments.sendPayment(
    newWallet.address,
    ethers.utils.parseEther(WELCOME_AMOUNT.toString()).toHexString(),
  );
  tx.wait(1).then(receipt => {
    console.log("\nTransaction mined.\n");
    const firstEvent = receipt && receipt.events && receipt.events[0];
    if (firstEvent && firstEvent.event == "PaymentMade") {
      console.log("Payment has been correctly made.");
    } else {
      console.error(`Payment not created in tx ${tx.hash}`);
    }
  });
};

const getBalanceByUserId = async userId => {
  const wallet = await walletsService.findByUserId(userId);
  if (!wallet) {
    return null;
  }
  return await fetchBalanceFromAddress(wallet.address);
};

const getBalanceContract = async () => {
  const balanceInEthers = await fetchBalanceFromAddress(config.contractAddress);
  if (!balanceInEthers) {
    return null;
  }
  return { balance: balanceInEthers, systemWallet: config.contractAddress };
};

const fetchBalanceFromAddress = async address => {
  const response = await fetch(
    `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${config.etherscanApiKey}`,
  );
  if (response.status !== 200) {
    return null;
  }
  const balance_info = await response.json();
  return ethers.utils.formatEther(balance_info.result);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet,
  getWalletIdWithUserId,
  getBalanceByUserId,
  getBalanceContract,
});
