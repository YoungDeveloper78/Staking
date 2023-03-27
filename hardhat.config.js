require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:"./config/config.env"});
// require("@nomiclabs/ha");

require("@nomiclabs/hardhat-waffle")
 

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
  

// };

module.exports = {
  solidity: "0.8.17",

  networks: {
    hardhat: {
    
    },
    goerli: {
      url: "https://goerli.infura.io/v3/c671003979ec46088e6c2e28a6a3a79a",
      accounts: {mnemonic:process.env.MY_MNEMONIC}
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      accounts: {mnemonic:process.env.CLIENT_MNEMONIC}
      
    },
  },

    etherscan: {
      apiKey: process.env.MY_BSC_PRIVATE,
    },

};