const hre = require("hardhat");

async function main(){
    const contract = await hre.ethers.deployContract("chai");
    await contract.waitForDeployment();
    console.log(contract.target);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });