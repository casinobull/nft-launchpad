import { Router } from 'express';
import { SiweMessage } from 'siwe';
import crypto from 'crypto';
import { signAuthToken } from '../../utils/jwt';

const router = Router();

const nonceStore = new Map<string, { nonce: string; createdAt: number }>();

router.get('/nonce', (_req, res) => {
	const nonce = crypto.randomBytes(16).toString('hex');
	nonceStore.set(nonce, { nonce, createdAt: Date.now() });
	res.json({ nonce });
});

router.post('/verify', async (req, res) => {
	const { message, signature } = req.body || {};
	if (!message || !signature) return res.status(400).json({ error: 'Missing message or signature' });

	try {
		const siweMessage = new SiweMessage(message);
		const fields = await siweMessage.verify({ signature });
		const nonce = fields.data.nonce as string;
		if (!nonce || !nonceStore.has(nonce)) {
			return res.status(400).json({ error: 'Invalid nonce' });
		}
		nonceStore.delete(nonce);
		const address = fields.data.address as string;
		const token = signAuthToken(address);
		return res.json({ token, address });
	} catch (err) {
		return res.status(400).json({ error: (err as Error).message || 'Invalid SIWE' });
	}
});

export default router;


