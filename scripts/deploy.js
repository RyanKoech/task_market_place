const hre = require("hardhat");

async function main() {
  console.log("Deploying..")
  // deployLockContract();
  deployTaskMarketPlaceContract();
  deployGreeter();
}

async function deployTaskMarketPlaceContract() {
  const contractName = "TaskMarketplace";
  const TaskMarketplace = await hre.ethers.getContractFactory(contractName);
  const taskMarketplace = await TaskMarketplace.deploy();

  await taskMarketplace.deployed();

  console.log(`${contractName} deployed to ${taskMarketplace.address}`);
}

// async function deployLockContract() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.utils.parseEther("0.001");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy([unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.deployed();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
  
// }

async function deployGreeter() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
