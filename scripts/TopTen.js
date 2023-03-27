
const contract = require('../utils/Connect');



const ethers = require('ethers');


async function alaki() {
let log= contract.topTen()
return log;
}
alaki().then((res)=>{
    
    
    console.log(res["TopTen"])
    console.log(res["TopTenAmount"].toString())
}).catch(err=>{
  console.log(err)
})