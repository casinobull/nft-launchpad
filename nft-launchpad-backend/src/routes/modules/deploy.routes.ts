import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { deployCollection } from '../../utils/ethers';
import { supabase } from '../../utils/supabase';
import { env } from '../../config/env';

const router = Router();

interface DeployBody {
	name: string;
	symbol: string;
	baseURI: string;
	maxSupply: number;
	mintPrice: string;
}

router.post('/', requireAuth, async (req, res) => {
	const { name, symbol, baseURI, maxSupply, mintPrice } = req.body as DeployBody;
	if (!name || !symbol || !baseURI || !maxSupply || !mintPrice) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const { collectionAddress, txHash } = await deployCollection(
			name,
			symbol,
			maxSupply,
			mintPrice,
			baseURI
		);

		// Store collection in database
		const { error } = await supabase.from('collections').insert({
			owner_address: req.user!.address.toLowerCase(),
			collection_address: collectionAddress,
			name,
			symbol,
			base_uri: baseURI,
			max_supply: maxSupply,
			price_wei: mintPrice,
			network: env.network,
			chain_id: env.chainId,
			tx_hash: txHash,
			created_at: new Date().toISOString()
		});
		
		if (error) throw error;

		return res.json({ 
			collectionAddress, 
			txHash,
			success: true 
		});
	} catch (err) {
		console.error('Deploy error:', err);
		return res.status(500).json({ error: (err as Error).message });
	}
});

export default router;


