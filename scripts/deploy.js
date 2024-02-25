//import hre from "hardhat";

const hre = require("hardhat");

async function main(){

    // get address
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();
    //const chai = await hre.ethers.getContractFactory("chai");
    //const contract = await chai.deploy(); // instance of contract

    const contract = await hre.ethers.deployContract("chai");
    const contract1 = await contract.waitForDeployment();
    console.log(contract.target);

    const addresses = [owner.address, from1.address,from2.address, from3.address];

    console.log(addresses);
    console.log("Before buying Chai");
    await consoleBalances(addresses);

    const amount = {value:hre.ethers.parseEther("1")}
    await contract.connect(from1).buyChai("from1","Very nice Chai.",amount);
    await contract.connect(from2).buyChai("from2","Very nice course.",amount);
    await contract.connect(from3).buyChai("from3","Very nice information.",amount);

    console.log("After buying Chai");
    await consoleBalances(addresses);

    //  Now check the Memos
    const memos =  await contract.getMemos();
    await consoleMemos(memos);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });



    // Get balance of the address given
    async function getBalances(address) {
        const balanceBigInt = await hre.ethers.provider.getBalance(address);
        return hre.ethers.formatEther(balanceBigInt);
    }

    // Console balances
    async function consoleBalances(addresses){
        let counter = 0;
        for(const address of addresses){
            console.log(`Address ${counter} balance.`, await getBalances(address));
            counter++;
        }
    }

    // 
    async function consoleMemos(memos){
        for(const memo of memos){
            const timestamp = memo.timestamp;
            const name = memo.name;
            const from = memo.from;
            const message = memo.message;

            console.log(`At ${timestamp}, name : ${name}, address : ${from}, message : ${message}`);           
        }
    }

