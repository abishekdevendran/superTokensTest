import redisClient from '@/database/redis';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const secretKey = process.env.SESSION_SECRET || 'secret';

export default session({
	store: new RedisStore({ client: redisClient, prefix: 'sess-' }),
	resave: false,
	saveUninitialized: false,
	secret: secretKey,
	proxy: true,
	name: process.env.NODE_ENV === 'production' ? '__Host-session' : 'session',
	rolling: true,
	cookie: {
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
		// sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		// secure: true,
		maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
		httpOnly: true
	}
});
