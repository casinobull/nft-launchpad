// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    
    uint256 public maxSupply;
    uint256 public mintPrice;
    bool public mintingEnabled;
    address public launchpadContract;
    
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    
    modifier onlyLaunchpad() {
        require(msg.sender == launchpadContract, "Only launchpad can call this function");
        _;
    }
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        uint256 _mintPrice,
        address _launchpadContract
    ) ERC721(name, symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
        launchpadContract = _launchpadContract;
        mintingEnabled = true;
        _nextTokenId = 1;
    }
    
    function mint(address to, string memory tokenURI) 
        external 
        payable 
        onlyLaunchpad 
        returns (uint256) 
    {
        require(mintingEnabled, "Minting is not enabled");
        require(_nextTokenId <= maxSupply, "Max supply reached");
        require(msg.value >= mintPrice, "Insufficient payment");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
        
        return tokenId;
    }
    
    function setMintingEnabled(bool enabled) external onlyOwner {
        mintingEnabled = enabled;
    }
    
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    function remainingSupply() external view returns (uint256) {
        return maxSupply - (_nextTokenId - 1);
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 