// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFTContract.sol";

contract NFTLaunchpad is Ownable {
    address[] public deployedNFTs;
    
    struct NFTProject {
        address nftContract;
        string name;
        string symbol;
        uint256 maxSupply;
        uint256 mintPrice;
        bool isActive;
        string baseURI;
    }
    
    mapping(address => NFTProject) public nftProjects;
    mapping(address => bool) public isDeployedNFT;
    
    event NFTProjectCreated(
        address indexed nftContract,
        string name,
        string symbol,
        uint256 maxSupply,
        uint256 mintPrice,
        string baseURI
    );
    
    event NFTMinted(
        address indexed nftContract,
        address indexed to,
        uint256 tokenId,
        string tokenURI
    );
    
    constructor() Ownable(msg.sender) {}
    
    function createNFTProject(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        uint256 mintPrice,
        string memory baseURI
    ) external onlyOwner returns (address) {
        // Deploy new NFT contract
        NFTContract nftContract = new NFTContract(
            name,
            symbol,
            maxSupply,
            mintPrice,
            address(this)
        );
        
        address nftContractAddress = address(nftContract);
        
        // Store project information
        nftProjects[nftContractAddress] = NFTProject({
            nftContract: nftContractAddress,
            name: name,
            symbol: symbol,
            maxSupply: maxSupply,
            mintPrice: mintPrice,
            isActive: true,
            baseURI: baseURI
        });
        
        deployedNFTs.push(nftContractAddress);
        isDeployedNFT[nftContractAddress] = true;
        
        emit NFTProjectCreated(
            nftContractAddress,
            name,
            symbol,
            maxSupply,
            mintPrice,
            baseURI
        );
        
        return nftContractAddress;
    }
    
    function mintNFT(
        address nftContract,
        string memory tokenURI
    ) external payable returns (uint256) {
        require(isDeployedNFT[nftContract], "NFT contract not found");
        require(nftProjects[nftContract].isActive, "Project is not active");
        
        // Forward the mint call to the NFT contract
        uint256 tokenId = NFTContract(nftContract).mint{value: msg.value}(
            msg.sender,
            tokenURI
        );
        
        emit NFTMinted(nftContract, msg.sender, tokenId, tokenURI);
        
        return tokenId;
    }
    
    function setProjectActive(address nftContract, bool active) external onlyOwner {
        require(isDeployedNFT[nftContract], "NFT contract not found");
        nftProjects[nftContract].isActive = active;
    }
    
    function updateProjectBaseURI(address nftContract, string memory newBaseURI) external onlyOwner {
        require(isDeployedNFT[nftContract], "NFT contract not found");
        nftProjects[nftContract].baseURI = newBaseURI;
    }
    
    function getProjectInfo(address nftContract) external view returns (NFTProject memory) {
        return nftProjects[nftContract];
    }
    
    function getAllDeployedNFTs() external view returns (address[] memory) {
        return deployedNFTs;
    }
    
    function getDeployedNFTsCount() external view returns (uint256) {
        return deployedNFTs.length;
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    // Function to receive ETH
    receive() external payable {}
} 