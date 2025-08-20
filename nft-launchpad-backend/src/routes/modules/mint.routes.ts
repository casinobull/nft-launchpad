import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { getLaunchpadContract } from '../../utils/ethers';
import { ethers } from 'ethers';

const router = Router();

interface MintBody {
	collectionAddress: string;
	quantity: number;
	priceWei?: string;
}

router.post('/', requireAuth, async (req, res) => {
	const { collectionAddress, quantity, priceWei } = req.body as MintBody;
	if (!collectionAddress || !quantity) {
		return res.status(400).json({ error: 'Missing required fields' });
	}
	try {
		const launchpad = getLaunchpadContract();
		const overrides: ethers.PayableOverrides = {};
		if (priceWei) {
			overrides.value = ethers.BigNumber.from(priceWei).mul(quantity);
		}
		const tx = await launchpad.mint(collectionAddress, req.user!.address, quantity, overrides);
		const receipt = await tx.wait();
		return res.json({ txHash: receipt.transactionHash });
	} catch (err) {
		return res.status(500).json({ error: (err as Error).message });
	}
});

export default router;


