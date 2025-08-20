import { Router } from 'express';
import { optionalAuth } from '../../middleware/auth';
import { supabase } from '../../utils/supabase';

const router = Router();

router.get('/', optionalAuth, async (_req, res) => {
	const { data, error } = await supabase
		.from('collections')
		.select('*')
		.order('created_at', { ascending: false });
	if (error) return res.status(500).json({ error: error.message });
	return res.json({ collections: data || [] });
});

router.get('/:address', optionalAuth, async (req, res) => {
	const { address } = req.params;
	const { data, error } = await supabase
		.from('collections')
		.select('*')
		.eq('collection_address', address.toLowerCase())
		.single();
	if (error) return res.status(404).json({ error: 'Collection not found' });
	return res.json({ collection: data });
});

export default router;


