const ethers = require("ethers");
const wallets = require("./walletService");
const config = require("../config");

const WELCOME_AMOUNT = "0.001";

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet " + wallet.address);
  return wallet;
};

const createWallet = () => async userId => {
  const provider = new ethers.providers.InfuraProvider(config.network, process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const walletsCount = (await wallets.countWallet()) + 1;
  const result = await wallets.create({
    id: walletsCount.toString(),
    user_id: userId,
    address: wallet.address,
    private_key: wallet.privateKey,
  });
  if (result) {
    await sendWelcomeGift(provider, wallet);
  }
  return result;
};

const getWalletsData = () => () => {
  return wallets.findAll();
};

const getWalletData = () => walletId => {
  return wallets.findById(walletId);
};

const getWalletIdWithUserId = async userId => {
  return (await wallets.findByUserId(userId)).id;
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

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet,
  getWalletIdWithUserId,
});
