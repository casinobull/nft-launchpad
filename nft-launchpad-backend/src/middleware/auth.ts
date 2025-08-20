import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken, AuthTokenPayload } from '../utils/jwt';

declare global {
	namespace Express {
		interface Request {
			user?: AuthTokenPayload;
		}
	}
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
	if (!token) {
		return res.status(401).json({ error: 'Missing authorization token' });
	}
	try {
		const payload = verifyAuthToken(token);
		req.user = payload;
		return next();
	} catch (_err) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
	if (!token) return next();
	try {
		req.user = verifyAuthToken(token);
		return next();
	} catch {
		return next();
	}
}


