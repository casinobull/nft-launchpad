const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Launchpad", function () {
  let nftLaunchpad;
  let owner;
  let user1;
  let user2;
  let addrs;

  beforeEach(async function () {
    [owner, user1, user2, ...addrs] = await ethers.getSigners();

    // Deploy NFT Launchpad
    const NFTLaunchpad = await ethers.getContractFactory("NFTLaunchpad");
    nftLaunchpad = await NFTLaunchpad.deploy();
    await nftLaunchpad.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await nftLaunchpad.owner()).to.equal(owner.address);
    });
  });

  describe("NFT Project Creation", function () {
    it("Should create a new NFT project", async function () {
      const projectName = "Test NFT";
      const projectSymbol = "TNFT";
      const maxSupply = 1000;
      const mintPrice = ethers.utils.parseEther("0.1");
      const baseURI = "ipfs://QmTest/";

      const tx = await nftLaunchpad.createNFTProject(
        projectName,
        projectSymbol,
        maxSupply,
        mintPrice,
        baseURI
      );

      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "NFTProjectCreated");
      
      expect(event).to.not.be.undefined;
      expect(event.args.name).to.equal(projectName);
      expect(event.args.symbol).to.equal(projectSymbol);
      expect(event.args.maxSupply).to.equal(maxSupply);
      expect(event.args.mintPrice).to.equal(mintPrice);
      expect(event.args.baseURI).to.equal(baseURI);

      const deployedNFTs = await nftLaunchpad.getAllDeployedNFTs();
      expect(deployedNFTs.length).to.equal(1);
    });

    it("Should fail if non-owner tries to create project", async function () {
      await expect(
        nftLaunchpad.connect(user1).createNFTProject(
          "Test NFT",
          "TNFT",
          1000,
          ethers.utils.parseEther("0.1"),
          "ipfs://QmTest/"
        )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("NFT Minting", function () {
    let nftContract;
    const mintPrice = ethers.utils.parseEther("0.1");

    beforeEach(async function () {
      // Create an NFT project
      const tx = await nftLaunchpad.createNFTProject(
        "Test NFT",
        "TNFT",
        1000,
        mintPrice,
        "ipfs://QmTest/"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "NFTProjectCreated");
      nftContract = event.args.nftContract;
    });

    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest/1.json";
      
      const tx = await nftLaunchpad.connect(user1).mintNFT(
        nftContract,
        tokenURI,
        { value: mintPrice }
      );

      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "NFTMinted");
      
      expect(event).to.not.be.undefined;
      expect(event.args.to).to.equal(user1.address);
      expect(event.args.tokenId).to.equal(1);
      expect(event.args.tokenURI).to.equal(tokenURI);

      // Check NFT ownership
      const nftInstance = await ethers.getContractAt("NFTContract", nftContract);
      expect(await nftInstance.ownerOf(1)).to.equal(user1.address);
      expect(await nftInstance.tokenURI(1)).to.equal(tokenURI);
    });

    it("Should fail if insufficient payment", async function () {
      const tokenURI = "ipfs://QmTest/1.json";
      const insufficientPayment = ethers.utils.parseEther("0.05");
      
      await expect(
        nftLaunchpad.connect(user1).mintNFT(
          nftContract,
          tokenURI,
          { value: insufficientPayment }
        )
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should fail if project is not active", async function () {
      // Deactivate the project
      await nftLaunchpad.setProjectActive(nftContract, false);
      
      const tokenURI = "ipfs://QmTest/1.json";
      
      await expect(
        nftLaunchpad.connect(user1).mintNFT(
          nftContract,
          tokenURI,
          { value: mintPrice }
        )
      ).to.be.revertedWith("Project is not active");
    });

    it("Should fail if max supply is reached", async function () {
      // Create a project with max supply of 1
      const tx = await nftLaunchpad.createNFTProject(
        "Limited NFT",
        "LNFT",
        1,
        mintPrice,
        "ipfs://QmLimited/"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "NFTProjectCreated");
      const limitedNFTContract = event.args.nftContract;

      // Mint the first NFT
      await nftLaunchpad.connect(user1).mintNFT(
        limitedNFTContract,
        "ipfs://QmLimited/1.json",
        { value: mintPrice }
      );

      // Try to mint second NFT
      await expect(
        nftLaunchpad.connect(user2).mintNFT(
          limitedNFTContract,
          "ipfs://QmLimited/2.json",
          { value: mintPrice }
        )
      ).to.be.revertedWith("Max supply reached");
    });
  });

  describe("Project Management", function () {
    let nftContract;

    beforeEach(async function () {
      const tx = await nftLaunchpad.createNFTProject(
        "Test NFT",
        "TNFT",
        1000,
        ethers.utils.parseEther("0.1"),
        "ipfs://QmTest/"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "NFTProjectCreated");
      nftContract = event.args.nftContract;
    });

    it("Should allow owner to set project active status", async function () {
      await nftLaunchpad.setProjectActive(nftContract, false);
      
      const projectInfo = await nftLaunchpad.getProjectInfo(nftContract);
      expect(projectInfo.isActive).to.be.false;
    });

    it("Should allow owner to update base URI", async function () {
      const newBaseURI = "ipfs://QmNew/";
      await nftLaunchpad.updateProjectBaseURI(nftContract, newBaseURI);
      
      const projectInfo = await nftLaunchpad.getProjectInfo(nftContract);
      expect(projectInfo.baseURI).to.equal(newBaseURI);
    });

    it("Should fail if non-owner tries to manage project", async function () {
      await expect(
        nftLaunchpad.connect(user1).setProjectActive(nftContract, false)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await expect(
        nftLaunchpad.connect(user1).updateProjectBaseURI(nftContract, "ipfs://QmNew/")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Query Functions", function () {
    it("Should return correct project count", async function () {
      expect(await nftLaunchpad.getDeployedNFTsCount()).to.equal(0);
      
      await nftLaunchpad.createNFTProject(
        "Test NFT 1",
        "TNFT1",
        1000,
        ethers.utils.parseEther("0.1"),
        "ipfs://QmTest1/"
      );
      
      expect(await nftLaunchpad.getDeployedNFTsCount()).to.equal(1);
      
      await nftLaunchpad.createNFTProject(
        "Test NFT 2",
        "TNFT2",
        500,
        ethers.utils.parseEther("0.2"),
        "ipfs://QmTest2/"
      );
      
      expect(await nftLaunchpad.getDeployedNFTsCount()).to.equal(2);
    });

    it("Should return all deployed NFTs", async function () {
      const tx1 = await nftLaunchpad.createNFTProject(
        "Test NFT 1",
        "TNFT1",
        1000,
        ethers.utils.parseEther("0.1"),
        "ipfs://QmTest1/"
      );
      const receipt1 = await tx1.wait();
      const event1 = receipt1.events.find(e => e.event === "NFTProjectCreated");
      const nftContract1 = event1.args.nftContract;

      const tx2 = await nftLaunchpad.createNFTProject(
        "Test NFT 2",
        "TNFT2",
        500,
        ethers.utils.parseEther("0.2"),
        "ipfs://QmTest2/"
      );
      const receipt2 = await tx2.wait();
      const event2 = receipt2.events.find(e => e.event === "NFTProjectCreated");
      const nftContract2 = event2.args.nftContract;

      const deployedNFTs = await nftLaunchpad.getAllDeployedNFTs();
      expect(deployedNFTs).to.include(nftContract1);
      expect(deployedNFTs).to.include(nftContract2);
    });
  });
}); 