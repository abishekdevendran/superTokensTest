import { lucia } from 'lucia';
import { express } from 'lucia/middleware';
import 'lucia/polyfill/node';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { redis as redisAdapter } from '@lucia-auth/adapter-session-redis';
import { queryClient } from '@/database/drizzle/setup';
import * as tableNames from '@/database/drizzle/schema';
import redisClient from '@/database/redis';
import { config } from 'dotenv';
import { github } from '@lucia-auth/oauth/providers';

config();
const isProd: boolean = process.env.NODE_ENV === 'production';

export const auth = lucia({
	env: isProd ? 'PROD' : 'DEV', // "PROD" if deployed to HTTPS
	middleware: express(),
	adapter: {
		user: postgresAdapter(queryClient, {
			user: 'auth_user',
			key: 'user_key',
			session: 'user_session'
		}),
		session: redisAdapter(redisClient)
	},
	getUserAttributes: (data) => {
		return {
			githubUsername: data.github_username
		};
	},
	csrfProtection: true
});

export type Auth = typeof auth;

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID ?? '',
	clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
});
