const address="";
const ethers = require('ethers');
const num="10000"

const contract = require('../utils/Connect');

async function alaki() {

let log= contract.functions.mint(ethers.utils.parseUnits(num).toString(),address)
return log;
}
alaki().then(res=>{
console.log(res);
}).catch(err=>{
  console.log(err)
}) 