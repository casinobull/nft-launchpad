import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { mintNFT, getCollectionInfo } from '../../utils/ethers';
import { supabase } from '../../utils/supabase';
import { env } from '../../config/env';

const router = Router();

interface MintBody {
	collectionAddress: string;
	tokenURI: string;
	mintPrice?: string;
}

router.post('/', requireAuth, async (req, res) => {
	const { collectionAddress, tokenURI, mintPrice } = req.body as MintBody;
	if (!collectionAddress || !tokenURI) {
		return res.status(400).json({ error: 'Missing required fields' });
	}
	
	try {
		// Get collection info to determine mint price if not provided
		let price = mintPrice;
		if (!price) {
			const collectionInfo = await getCollectionInfo(collectionAddress);
			price = collectionInfo.mintPrice.toString();
		}
		
		const { tokenId, txHash } = await mintNFT(
			collectionAddress,
			req.user!.address,
			tokenURI,
			price
		);
		
		// Store mint record in database
		const { error } = await supabase.from('mints').insert({
			user_address: req.user!.address.toLowerCase(),
			collection_address: collectionAddress,
			token_id: tokenId,
			token_uri: tokenURI,
			tx_hash: txHash,
			mint_price: price,
			network: env.network,
			chain_id: env.chainId,
			created_at: new Date().toISOString()
		});
		
		if (error) throw error;
		
		return res.json({ 
			tokenId, 
			txHash,
			success: true 
		});
	} catch (err) {
		console.error('Mint error:', err);
		return res.status(500).json({ error: (err as Error).message });
	}
});

export default router;


