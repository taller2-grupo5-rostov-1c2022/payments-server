const ethers = require("ethers");
const accounts = require("../service/wallet_service");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async () => {
  const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const walletsCount = (await accounts.countWallet()) + 1;

  return await accounts.create({
    id: walletsCount.toString(),
    user_id: 1, // TODO: pedir user_id con endpoint
    address: wallet.address,
    private_key: wallet.privateKey,
  });
};

const getWalletsData = () => () => {
  return accounts.findAll();
};

const getWalletData = () => index => {
  return accounts.findById(index);
};

const getWallet = index => {
  console.log("index", index, "infura key", process.env.INFURA_API_KEY);
  const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
  console.log("pk", JSON.stringify(getWalletData(index).private_key));
  return new ethers.Wallet(getWalletData(index).private_key, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet
});
