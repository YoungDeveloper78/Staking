const {expect,use} = require('chai');
const { ethers } = require("hardhat");
// const chai = require('chai');
const {
    time,
    loadFixture,

  } = require("@nomicfoundation/hardhat-network-helpers");
// const ethers = require('ethers');
// const bignum=new ethers.BigNumber()
const BN = require('bn.js');
// use()
use(require('chai-bn')(BN))
describe("Staking",function(){
    let StakeContract=Object;
    let BUSDToken=Object;
    let LPToken=Object;
        async function deployContracts(){
                    
            

            const BUSD = await ethers.getContractFactory("BUSD");
            const busd = await BUSD.deploy(ethers.utils.parseUnits("100","ether"));
            await busd.deployed()
        
            const LPT = await ethers.getContractFactory("LPT");
            const lpt= await LPT.deploy(ethers.utils.parseUnits("100","ether"));  
            await lpt.deployed()
            

                    
            const Staking = await ethers.getContractFactory("Staking");
            const staking= await Staking.deploy(lpt.address,busd.address);  
            await staking.deployed()
            BUSDToken=busd
            LPToken=lpt
            StakeContract=staking
            // return { staking , busd , lpt ,owner }
        }
        describe("deploy",async function(){
            it("is deployed?",async function(){
                const [owner]=await ethers.getSigners()
                await loadFixture(deployContracts)
                expect(await StakeContract.owner()).to.equal(owner.address)
            })

        })
        describe("Deployment",async function () {
        
        
        
            it("staking token sould set LPT", async function () {
            

              expect(await StakeContract.rewardToken()).to.equal(BUSDToken.address);
            });
            
            it("reward token sould set BUSD", async function () {
            

                expect(await StakeContract.stakingToken()).to.equal(LPToken.address);
              });
            
            
            it("Should set the right owner", async function () {
            
                const [owner]=await ethers.getSigners()
              expect(await StakeContract.owner()).to.equal(owner.address);
            });
        
          });
          
        // describe("stake with multiple account")
        describe("mint tokens",function(){
            it("minting", async function () {
            
            const signers = await ethers.getSigners();
            
            
            
            for (let i = 1; i < signers.length; i++) {
                await LPToken.connect(signers[0]).mint(signers[i].address,ethers.utils.parseUnits("100","ether"))
                expect(await LPToken.balanceOf(signers[i].address)).to.equal(ethers.utils.parseUnits("100","ether"))
            }
            
            
        })
        describe("approve", function(){
                    
        it("check approve",async function(){
            const signers = await ethers.getSigners();


            for (let i = 0; i < signers.length; i++) {
                await LPToken.connect(signers[i]).approve(StakeContract.address,ethers.utils.parseUnits("100","ether"))
                 expect(await LPToken.allowance(signers[i].address,StakeContract.address)).to.equal(ethers.utils.parseUnits("100","ether"))

                
            }
        })

    })
})

    describe("stake lp", function(){
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
         describe("set Stake Time",async function(){
            it("check setstake error",async function(){
                
                const otherAccount = await ethers.getSigners();
                await expect(StakeContract.connect(otherAccount[1]).setStake()).to.be.revertedWith(
                    "Ownable: caller is not the owner"
                  );
            })

            it("check time",async function(){
                const  [owner]=await ethers.getSigners()
                await StakeContract.setStake()
                const startTime = await time.latest()
            

                expect(await StakeContract.startStakeTimestamp()).to.equal(startTime)
            })
          })
          describe("stake with multiple accounts",async function(){
            it("stake with wrong number",async function(){
                const  [owner]=await ethers.getSigners()

                await expect(StakeContract.connect(owner).stake("0")).to.be.revertedWith("zero amount")
            })
            it("stake with diffrent account",async function(){
            
            
                const signers=await ethers.getSigners()
                for (let i = 1; i < signers.length; i++) {
                    const amount=randomIntFromInterval(1,99)
                    await StakeContract.connect(signers[i]).stake(ethers.utils.parseUnits(amount.toString()))
                    
                
                    
                }
                const toptenAmounts=await StakeContract.topTen()

                const amounts=toptenAmounts[1]
                    for (let i = 0; i < 9; i++) {
                    expect(await amounts[i]).to.be.bignumber.greaterThanOrEqual(await amounts[i+1])
                    }
    
        
            })
          })
          describe("stake errors",async function(){
            
            it("twice staking error",async function(){
                const signers=await ethers.getSigners()
                const account1=signers[1]
                await expect( StakeContract.connect(account1).stake("1000000")).to.be.revertedWith("you have already staked amount")

            })
          })
          

        

            


        })
          
        
})
