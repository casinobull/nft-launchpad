import { Router } from 'express';
import { optionalAuth } from '../../middleware/auth';
import { supabase } from '../../utils/supabase';
import { getCollectionInfo, getAllCollections } from '../../utils/ethers';
import { env } from '../../config/env';

const router = Router();

router.get('/', optionalAuth, async (_req, res) => {
	try {
		// Get collections from database
		const { data: dbCollections, error } = await supabase
			.from('collections')
			.select('*')
			.order('created_at', { ascending: false });
		
		if (error) throw error;
		
		// Get collections from contract
		const contractCollections = await getAllCollections();
		
		// Merge data
		const collections = (dbCollections || []).map(collection => ({
			...collection,
			contract_address: collection.collection_address,
			is_on_contract: contractCollections.includes(collection.collection_address)
		}));
		
		return res.json({ collections });
	} catch (err) {
		console.error('Collections error:', err);
		return res.status(500).json({ error: (err as Error).message });
	}
});

router.get('/:address', optionalAuth, async (req, res) => {
	const { address } = req.params;
	
	try {
		// Get collection from database
		const { data: dbCollection, error } = await supabase
			.from('collections')
			.select('*')
			.eq('collection_address', address.toLowerCase())
			.single();
		
		if (error) {
			return res.status(404).json({ error: 'Collection not found in database' });
		}
		
		// Get collection info from contract
		let contractInfo = null;
		try {
			contractInfo = await getCollectionInfo(address);
		} catch (contractError) {
			console.warn('Could not fetch contract info:', contractError);
		}
		
		const collection = {
			...dbCollection,
			contract_info: contractInfo,
			contract_address: dbCollection.collection_address
		};
		
		return res.json({ collection });
	} catch (err) {
		console.error('Collection detail error:', err);
		return res.status(500).json({ error: (err as Error).message });
	}
});

router.get('/:address/mints', optionalAuth, async (req, res) => {
	const { address } = req.params;
	
	try {
		const { data: mints, error } = await supabase
			.from('mints')
			.select('*')
			.eq('collection_address', address.toLowerCase())
			.order('created_at', { ascending: false });
		
		if (error) throw error;
		
		return res.json({ mints: mints || [] });
	} catch (err) {
		console.error('Collection mints error:', err);
		return res.status(500).json({ error: (err as Error).message });
	}
});

export default router;


