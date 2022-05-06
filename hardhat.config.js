require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    ropsten: { 
    url: 'https://eth-ropsten.alchemyapi.io/v2/2uOw3zM3aYUy2AaEC0wrP3cnvByrWgwJ',
    accounts: ['aa1bd15487541f15f00a2b3665a43d37c57575d92caf7d42abc878e93f109d66'] 
  }
 }
};