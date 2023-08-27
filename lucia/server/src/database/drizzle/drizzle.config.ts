import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
	schema: './schema/index.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL ?? ''
	}
} satisfies Config;
