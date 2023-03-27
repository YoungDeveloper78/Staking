
const ethers = require('ethers');
const abi=require('../artifacts/contracts/Staking.sol/Staking.json').abi;

const provider = require('../utils/Connect');

const signer =new ethers.Wallet(process.env.PRIVATEKEY)
const contract = new ethers.Contract(contractAddress, abi, provider);



async function alaki() {

let log= contract.connect(signer).setStake()
return log;
}

alaki().then(res=>{
console.log(res);
}).catch(err=>{
  console.log(err)
}) 