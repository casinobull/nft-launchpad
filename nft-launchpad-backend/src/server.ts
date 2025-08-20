import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import app from './app';

const port = Number(process.env.PORT || 4000);

const uploadsRoot = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsRoot)) {
	fs.mkdirSync(uploadsRoot, { recursive: true });
}
const uploadsTmp = path.join(uploadsRoot, 'tmp');
if (!fs.existsSync(uploadsTmp)) {
	fs.mkdirSync(uploadsTmp, { recursive: true });
}
const uploadsExtracted = path.join(uploadsRoot, 'extracted');
if (!fs.existsSync(uploadsExtracted)) {
	fs.mkdirSync(uploadsExtracted, { recursive: true });
}

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${port}`);
});


