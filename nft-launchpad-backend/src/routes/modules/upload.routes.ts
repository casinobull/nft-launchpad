import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { requireAuth } from '../../middleware/auth';
import { supabase } from '../../utils/supabase';
import { env } from '../../config/env';

const router = Router();

const upload = multer({ dest: path.join(process.cwd(), 'uploads', 'tmp') });

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'Missing file' });
	if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

	const tempFilePath = req.file.path;
	const extractDir = path.join(process.cwd(), 'uploads', 'extracted', `${Date.now()}_${Math.random().toString(16).slice(2)}`);
	fs.mkdirSync(extractDir, { recursive: true });

	try {
		const zip = new AdmZip(tempFilePath);
		zip.extractAllTo(extractDir, true);
	} catch (err) {
		fs.unlinkSync(tempFilePath);
		return res.status(400).json({ error: 'Invalid ZIP file' });
	}

	const folderName = path.basename(extractDir);
	const basePath = `${req.user.address.toLowerCase()}/${folderName}`;

	async function walkAndUpload(dir: string, prefix = ''): Promise<string[]> {
		const uploaded: string[] = [];
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			const relPath = path.posix.join(prefix, entry.name);
			if (entry.isDirectory()) {
				const nested = await walkAndUpload(fullPath, relPath);
				uploaded.push(...nested);
			} else if (entry.isFile()) {
				const fileBuffer = fs.readFileSync(fullPath);
				const { error } = await supabase.storage
					.from(env.supabaseStorageBucket)
					.upload(`${basePath}/${relPath}`, fileBuffer, {
						upsert: true,
						cacheControl: '3600',
						contentType: undefined,
					});
				if (error) throw error;
				uploaded.push(`${basePath}/${relPath}`);
			}
		}
		return uploaded;
	}

	try {
		const uploadedPaths = await walkAndUpload(extractDir);
		fs.unlinkSync(tempFilePath);
		const publicBaseUrl = `${process.env.SUPABASE_URL?.replace(/\/$/, '')}/storage/v1/object/public/${env.supabaseStorageBucket}/${basePath}/`;
		res.json({ basePath, publicBaseUrl, files: uploadedPaths });
	} catch (err) {
		fs.unlinkSync(tempFilePath);
		return res.status(500).json({ error: (err as Error).message });
	} finally {
		try { fs.rmSync(extractDir, { recursive: true, force: true }); } catch {}
	}
});

export default router;


