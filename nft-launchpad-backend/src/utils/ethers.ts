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
			"event CollectionDeployed(address indexed collection,address indexed owner,string name,string symbol)",
			"function deployCollection(string name,string symbol,string baseURI,uint256 maxSupply,uint256 priceWei) returns (address)",
			"function mint(address collection,address to,uint256 quantity) payable",
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


