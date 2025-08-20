const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy NFT Launchpad Contract
  console.log("\nDeploying NFT Launchpad Contract...");
  const NFTLaunchpad = await ethers.getContractFactory("NFTLaunchpad");
  const nftLaunchpad = await NFTLaunchpad.deploy();
  await nftLaunchpad.deployed();
  console.log("NFT Launchpad deployed to:", nftLaunchpad.address);

  console.log("\n=== Deployment Summary ===");
  console.log("NFT Launchpad:", nftLaunchpad.address);
  console.log("Deployer:", deployer.address);
  console.log("========================\n");

  // Verify contracts on Etherscan (if not on localhost)
  if (network.name !== "localhost" && network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await nftLaunchpad.deployTransaction.wait(6);

    console.log("Verifying contracts on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: nftLaunchpad.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.log("Error verifying NFT Launchpad:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 