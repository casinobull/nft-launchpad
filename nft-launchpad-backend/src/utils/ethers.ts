import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { env } from '../config/env';

export const provider = new ethers.providers.JsonRpcProvider(env.rpcUrl);
export const wallet = new ethers.Wallet(env.privateKey, provider);

export function getLaunchpadContract(): ethers.Contract {
	let abi: any;
	if (env.launchpadUseMock) {
		abi = [
			"event NFTProjectCreated(address indexed nftContract,string name,string symbol,uint256 maxSupply,uint256 mintPrice,string baseURI)",
			"event NFTMinted(address indexed nftContract,address indexed to,uint256 tokenId,string tokenURI)",
			"function createNFTProject(string name,string symbol,uint256 maxSupply,uint256 mintPrice,string baseURI) returns (address)",
			"function mintNFT(address nftContract,string tokenURI) payable returns (uint256)",
			"function getProjectInfo(address nftContract) view returns (address nftContract,string name,string symbol,uint256 maxSupply,uint256 mintPrice,bool isActive,string baseURI)",
			"function getAllDeployedNFTs() view returns (address[])",
			"function setProjectActive(address nftContract,bool active)",
			"function updateProjectBaseURI(address nftContract,string newBaseURI)"
		];
	} else {
		const abiPath = path.isAbsolute(env.launchpadAbiPath)
			? env.launchpadAbiPath
			: path.join(process.cwd(), 'src', env.launchpadAbiPath.replace(/^\.\//, ''));
		const json = fs.readFileSync(abiPath, 'utf-8');
		abi = JSON.parse(json);
	}
	return new ethers.Contract(env.launchpadAddress, abi, wallet);
}

export function getNFTContract(address: string): ethers.Contract {
	const abi = [
		"function mint(address to, string memory tokenURI) payable returns (uint256)",
		"function tokenURI(uint256 tokenId) view returns (string)",
		"function ownerOf(uint256 tokenId) view returns (address)",
		"function balanceOf(address owner) view returns (uint256)",
		"function totalSupply() view returns (uint256)",
		"function maxSupply() view returns (uint256)",
		"function mintPrice() view returns (uint256)",
		"function name() view returns (string)",
		"function symbol() view returns (string)"
	];
	return new ethers.Contract(address, abi, wallet);
}

export async function deployCollection(
	name: string,
	symbol: string,
	maxSupply: number,
	mintPrice: string,
	baseURI: string
): Promise<{ collectionAddress: string; txHash: string }> {
	const launchpad = getLaunchpadContract();
	
	// Convert mintPrice to wei
	const priceWei = ethers.utils.parseEther(mintPrice);
	
	const tx = await launchpad.createNFTProject(
		name,
		symbol,
		maxSupply,
		priceWei,
		baseURI
	);
	
	const receipt = await tx.wait();
	
	// Find the NFTProjectCreated event
	let collectionAddress: string | undefined;
	for (const log of receipt.logs) {
		try {
			const parsed = launchpad.interface.parseLog(log);
			if (parsed && parsed.name === 'NFTProjectCreated') {
				collectionAddress = parsed.args.nftContract;
				break;
			}
		} catch {}
	}
	
	if (!collectionAddress) {
		throw new Error('Failed to determine collection address from transaction');
	}
	
	return {
		collectionAddress,
		txHash: receipt.transactionHash
	};
}

export async function mintNFT(
	collectionAddress: string,
	to: string,
	tokenURI: string,
	mintPrice: string
): Promise<{ tokenId: number; txHash: string }> {
	const launchpad = getLaunchpadContract();
	
	// Convert mintPrice to wei
	const priceWei = ethers.utils.parseEther(mintPrice);
	
	const tx = await launchpad.mintNFT(collectionAddress, tokenURI, {
		value: priceWei
	});
	
	const receipt = await tx.wait();
	
	// Find the NFTMinted event
	let tokenId: number | undefined;
	for (const log of receipt.logs) {
		try {
			const parsed = launchpad.interface.parseLog(log);
			if (parsed && parsed.name === 'NFTMinted') {
				tokenId = parsed.args.tokenId.toNumber();
				break;
			}
		} catch {}
	}
	
	if (tokenId === undefined) {
		throw new Error('Failed to determine token ID from transaction');
	}
	
	return {
		tokenId,
		txHash: receipt.transactionHash
	};
}

export async function getCollectionInfo(collectionAddress: string) {
	const launchpad = getLaunchpadContract();
	return await launchpad.getProjectInfo(collectionAddress);
}

export async function getAllCollections(): Promise<string[]> {
	const launchpad = getLaunchpadContract();
	return await launchpad.getAllDeployedNFTs();
}


