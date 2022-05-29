const ethers = require("ethers");
const wallets = require("../service/wallet_service");
const config = require("../config");

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

  return await wallets.create({
    id: walletsCount.toString(),
    user_id: userId,
    address: wallet.address,
    private_key: wallet.privateKey,
  });
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

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet,
  getWalletIdWithUserId,
});
