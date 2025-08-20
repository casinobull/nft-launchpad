const { ethers } = require("hardhat");

async function main() {
  // Get signers
  const [owner, user1, user2] = await ethers.getSigners();
  
  console.log("=== NFT Launchpad Interaction Demo ===\n");
  console.log("Owner:", owner.address);
  console.log("User 1:", user1.address);
  console.log("User 2:", user2.address);
  console.log("");

  // Deploy contracts (or get existing ones)
  console.log("Deploying contracts...");
  
  const NFTContract = await ethers.getContractFactory("NFTContract");
  const nftImplementation = await NFTContract.deploy();
  await nftImplementation.deployed();
  console.log("NFT Implementation deployed to:", nftImplementation.address);

  const NFTLaunchpad = await ethers.getContractFactory("NFTLaunchpad");
  const nftLaunchpad = await NFTLaunchpad.deploy();
  await nftLaunchpad.deployed();
  console.log("NFT Launchpad deployed to:", nftLaunchpad.address);

  // Set NFT implementation
  await nftLaunchpad.setNFTImplementation(nftImplementation.address);
  console.log("NFT implementation set in launchpad\n");

  // Create an NFT project
  console.log("Creating NFT project...");
  const projectName = "Cool NFT Collection";
  const projectSymbol = "CNC";
  const maxSupply = 100;
  const mintPrice = ethers.utils.parseEther("0.05"); // 0.05 ETH
  const baseURI = "ipfs://QmYourIPFSHash/";

  const createProjectTx = await nftLaunchpad.createNFTProject(
    projectName,
    projectSymbol,
    maxSupply,
    mintPrice,
    baseURI
  );
  
  const createProjectReceipt = await createProjectTx.wait();
  const createProjectEvent = createProjectReceipt.events.find(e => e.event === "NFTProjectCreated");
  const nftContractAddress = createProjectEvent.args.nftContract;
  
  console.log("NFT Project created!");
  console.log("Project Name:", projectName);
  console.log("Project Symbol:", projectSymbol);
  console.log("Max Supply:", maxSupply.toString());
  console.log("Mint Price:", ethers.utils.formatEther(mintPrice), "ETH");
  console.log("NFT Contract Address:", nftContractAddress);
  console.log("");

  // Get project info
  console.log("Getting project information...");
  const projectInfo = await nftLaunchpad.getProjectInfo(nftContractAddress);
  console.log("Project Info:", {
    name: projectInfo.name,
    symbol: projectInfo.symbol,
    maxSupply: projectInfo.maxSupply.toString(),
    mintPrice: ethers.utils.formatEther(projectInfo.mintPrice),
    isActive: projectInfo.isActive,
    baseURI: projectInfo.baseURI
  });
  console.log("");

  // Mint NFTs
  console.log("Minting NFTs...");
  
  // User 1 mints an NFT
  const tokenURI1 = "ipfs://QmYourIPFSHash/1.json";
  console.log("User 1 minting NFT with URI:", tokenURI1);
  
  const mintTx1 = await nftLaunchpad.connect(user1).mintNFT(
    nftContractAddress,
    tokenURI1,
    { value: mintPrice }
  );
  
  const mintReceipt1 = await mintTx1.wait();
  const mintEvent1 = mintReceipt1.events.find(e => e.event === "NFTMinted");
  const tokenId1 = mintEvent1.args.tokenId;
  
  console.log("User 1 successfully minted NFT with ID:", tokenId1.toString());
  console.log("");

  // User 2 mints an NFT
  const tokenURI2 = "ipfs://QmYourIPFSHash/2.json";
  console.log("User 2 minting NFT with URI:", tokenURI2);
  
  const mintTx2 = await nftLaunchpad.connect(user2).mintNFT(
    nftContractAddress,
    tokenURI2,
    { value: mintPrice }
  );
  
  const mintReceipt2 = await mintTx2.wait();
  const mintEvent2 = mintReceipt2.events.find(e => e.event === "NFTMinted");
  const tokenId2 = mintEvent2.args.tokenId;
  
  console.log("User 2 successfully minted NFT with ID:", tokenId2.toString());
  console.log("");

  // Get NFT contract instance and check ownership
  const nftContract = await ethers.getContractAt("NFTContract", nftContractAddress);
  
  console.log("Checking NFT ownership...");
  console.log("Token 1 owner:", await nftContract.ownerOf(tokenId1));
  console.log("Token 2 owner:", await nftContract.ownerOf(tokenId2));
  console.log("Total supply:", (await nftContract.totalSupply()).toString());
  console.log("Remaining supply:", (await nftContract.remainingSupply()).toString());
  console.log("");

  // Create another project
  console.log("Creating another NFT project...");
  const projectName2 = "Rare NFT Collection";
  const projectSymbol2 = "RNC";
  const maxSupply2 = 50;
  const mintPrice2 = ethers.utils.parseEther("0.1"); // 0.1 ETH
  const baseURI2 = "ipfs://QmAnotherIPFSHash/";

  const createProjectTx2 = await nftLaunchpad.createNFTProject(
    projectName2,
    projectSymbol2,
    maxSupply2,
    mintPrice2,
    baseURI2
  );
  
  const createProjectReceipt2 = await createProjectTx2.wait();
  const createProjectEvent2 = createProjectReceipt2.events.find(e => e.event === "NFTProjectCreated");
  const nftContractAddress2 = createProjectEvent2.args.nftContract;
  
  console.log("Second NFT Project created!");
  console.log("Project Name:", projectName2);
  console.log("NFT Contract Address:", nftContractAddress2);
  console.log("");

  // Get all deployed NFTs
  console.log("Getting all deployed NFT contracts...");
  const allDeployedNFTs = await nftLaunchpad.getAllDeployedNFTs();
  console.log("Total deployed NFT contracts:", allDeployedNFTs.length);
  console.log("Deployed NFT addresses:", allDeployedNFTs);
  console.log("");

  // Demonstrate project management
  console.log("Demonstrating project management...");
  
  // Deactivate the first project
  await nftLaunchpad.setProjectActive(nftContractAddress, false);
  console.log("First project deactivated");
  
  // Try to mint from deactivated project (should fail)
  console.log("Attempting to mint from deactivated project...");
  try {
    await nftLaunchpad.connect(user1).mintNFT(
      nftContractAddress,
      "ipfs://QmYourIPFSHash/3.json",
      { value: mintPrice }
    );
  } catch (error) {
    console.log("Minting failed as expected:", error.message);
  }
  
  // Reactivate the project
  await nftLaunchpad.setProjectActive(nftContractAddress, true);
  console.log("First project reactivated");
  console.log("");

  // Update base URI
  const newBaseURI = "ipfs://QmUpdatedIPFSHash/";
  await nftLaunchpad.updateProjectBaseURI(nftContractAddress, newBaseURI);
  console.log("Updated base URI to:", newBaseURI);
  
  const updatedProjectInfo = await nftLaunchpad.getProjectInfo(nftContractAddress);
  console.log("Updated project base URI:", updatedProjectInfo.baseURI);
  console.log("");

  console.log("=== Demo completed successfully! ===");
  console.log("\nSummary:");
  console.log("- Created 2 NFT projects");
  console.log("- Minted 2 NFTs");
  console.log("- Demonstrated project management features");
  console.log("- Showed query functions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 