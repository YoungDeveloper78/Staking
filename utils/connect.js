
// module.exports = contract;
require('dotenv').config({path:"../config/config.env"});
const Web3 = require('web3')
const ethers = require('ethers');
const web3 = new Web3("https://bsc-dataseed1.binance.org");
const abi = require('../artifacts/contracts/Staking.sol/Staking.json').abi;
const contractAddress="";
const API_KEY=process.env.ETHERPRIVATE
const PRIVATE_KEY=process.env.MY_PRIVATE_KEY 



const provider=new ethers.providers.JsonRpcProvider()

// const wallet=new ethers.Wallet()
// const signer =wallet.connect(provider)
// const contract = new ethers.Contract(contractAddress, abi, signer);

module.exports = provider;
