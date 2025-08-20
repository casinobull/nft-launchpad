export function getEnv(name: string, defaultValue?: string): string {
	const value = process.env[name] ?? defaultValue;
	if (value === undefined) {
		throw new Error(`Missing required env var: ${name}`);
	}
	return value;
}

export const env = {
	port: Number(process.env.PORT || 4000),
	nodeEnv: process.env.NODE_ENV || 'development',
	frontendOrigin: (process.env.FRONTEND_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean),
	jwTSecret: getEnv('JWT_SECRET'),
	jwTExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
	supabaseUrl: getEnv('SUPABASE_URL'),
	supabaseServiceKey: getEnv('SUPABASE_SERVICE_ROLE_KEY'),
	supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || 'nft-assets',
	rpcUrl: getEnv('RPC_URL'),
	privateKey: getEnv('PRIVATE_KEY'),
	network: process.env.NETWORK || 'sepolia',
	launchpadAddress: getEnv('LAUNCHPAD_CONTRACT_ADDRESS'),
	launchpadAbiPath: process.env.LAUNCHPAD_ABI_PATH || './abi/LaunchpadABI.json',
	launchpadUseMock: process.env.LAUNCHPAD_USE_MOCK === 'true',
};


