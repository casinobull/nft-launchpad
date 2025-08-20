import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getLaunchpadContract, wallet } from '../../utils/ethers';
import { supabase } from '../../utils/supabase';

const router = Router();

interface DeployBody {
	name: string;
	symbol: string;
	baseURI: string;
	maxSupply: number;
	priceWei: string;
}

router.post('/', requireAuth, async (req, res) => {
	const { name, symbol, baseURI, maxSupply, priceWei } = req.body as DeployBody;
	if (!name || !symbol || !baseURI || !maxSupply || !priceWei) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const launchpad = getLaunchpadContract();
		const tx = await launchpad.deployCollection(name, symbol, baseURI, maxSupply, priceWei);
		const receipt = await tx.wait();

		let collectionAddress: string | undefined;
		for (const log of receipt.logs) {
			try {
				const parsed = launchpad.interface.parseLog(log);
				if (parsed && parsed.name === 'CollectionDeployed') {
					collectionAddress = parsed.args.collection;
					break;
				}
			} catch {}
		}

		if (!collectionAddress) {
			return res.status(500).json({ error: 'Failed to determine collection address' });
		}

		const { error } = await supabase.from('collections').insert({
			owner_address: req.user!.address.toLowerCase(),
			collection_address: collectionAddress,
			name,
			symbol,
			base_uri: baseURI,
			max_supply: maxSupply,
			price_wei: priceWei,
			network: (await wallet.provider.getNetwork()).name,
		});
		if (error) throw error;

		return res.json({ collectionAddress, txHash: receipt.transactionHash });
	} catch (err) {
		return res.status(500).json({ error: (err as Error).message });
	}
});

export default router;


