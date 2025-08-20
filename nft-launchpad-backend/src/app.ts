import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();


const originDelegate: cors.CorsOptions['origin'] = (requestOrigin, callback) => {
	const allowed = (process.env.FRONTEND_ORIGIN || '').split(',').map((o) => o.trim()).filter(Boolean);
	if (!requestOrigin || allowed.length === 0) {
		return callback(null, true);
	}
	if (allowed.includes(requestOrigin)) {
		return callback(null, true);
	}
	return callback(new Error('Not allowed by CORS'));
};

app.use(cors({
	origin: originDelegate,
	credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (_req, res) => {
	res.json({ ok: true });
});

app.use('/', routes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	const message = err instanceof Error ? err.message : 'Unknown error';
	res.status(500).json({ error: message });
});

export default app;


