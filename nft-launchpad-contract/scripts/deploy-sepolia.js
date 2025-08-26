const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy NFT Launchpad Contract
  console.log("\nDeploying NFT Launchpad Contract to Sepolia...");
  const NFTLaunchpad = await ethers.getContractFactory("NFTLaunchpad");
  const nftLaunchpad = await NFTLaunchpad.deploy();
  await nftLaunchpad.deployed();
  console.log("NFT Launchpad deployed to:", nftLaunchpad.address);

  console.log("\n=== Deployment Summary ===");
  console.log("NFT Launchpad:", nftLaunchpad.address);
  console.log("Deployer:", deployer.address);
  console.log("Network: Sepolia");
  console.log("========================\n");

  // Wait for block confirmations
  console.log("Waiting for block confirmations...");
  await nftLaunchpad.deployTransaction.wait(6);

  // Verify contracts on Etherscan
  console.log("Verifying contracts on Etherscan...");
  try {
    await hre.run("verify:verify", {
      address: nftLaunchpad.address,
      constructorArguments: [],
    });
    console.log("Contract verified on Etherscan!");
  } catch (error) {
    console.log("Error verifying NFT Launchpad:", error.message);
  }

  console.log("\n=== Environment Variables ===");
  console.log("LAUNCHPAD_CONTRACT_ADDRESS=" + nftLaunchpad.address);
  console.log("RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY");
  console.log("PRIVATE_KEY=your_private_key_here");
  console.log("========================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
