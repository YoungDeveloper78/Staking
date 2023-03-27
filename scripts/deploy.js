const hre = require("hardhat");
const Pair = "0x24B411e4CeFbE88B84Ed5d833870A008a0e543eb"
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56"


const ContractName="Staking"
async function main() {

    const Contract = await hre.ethers.getContractFactory(ContractName);
    const contract = await Contract.deploy(Pair,BUSD);
  
    const logger = await contract.deployed();
    
    const deployLog=logger.deployTransaction
    const temp = new Map();

    for (const [key, value] of Object.entries(deployLog)) {

       if(key === "data"){
           continue;
       }
       temp.set(key , value);
     }
    console.log(logger.provider);
    console.log(logger.signer);
    console.log(temp);
    // const LogArr=[logger.provider,logger.signer,temp]
    // for (let i = 0; i < LogArr.length; i++) {
    //   fs.writeFileSync(join(routPath,"data/Log.json"),`${LogArr[i]},`)
      
    // }
    console.log(
      `address is : ${logger.address}`
    );
    
  }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  