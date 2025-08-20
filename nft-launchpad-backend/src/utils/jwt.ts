import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthTokenPayload {
	address: string;
	sub: string;
	iss: 'nft-launchpad-backend';
	iat?: number;
	exp?: number;
}

export function signAuthToken(address: string): string {
	const payload: AuthTokenPayload = {
		address,
		sub: address.toLowerCase(),
		iss: 'nft-launchpad-backend',
	};
	const options: SignOptions = { expiresIn: env.jwTExpiresIn as unknown as number };
	return jwt.sign(payload, env.jwTSecret as unknown as jwt.Secret, options);
}

export function verifyAuthToken(token: string): AuthTokenPayload {
	return jwt.verify(token, env.jwTSecret) as AuthTokenPayload;
}


