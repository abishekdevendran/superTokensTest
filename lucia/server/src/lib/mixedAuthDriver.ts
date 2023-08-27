import {
	LuciaError,
	SessionAdapter,
	SessionSchema,
	UserAdapter,
	UserSchema
} from 'lucia';
import redisClient from '@/database/redis';
import { queryClient } from '@/database/drizzle/setup';
import * as schema from '@/database/drizzle/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

const db = drizzle(queryClient, { schema });

type Adapter = {
	getSessionAndUser?: (
		sessionId: string
	) => Promise<[SessionSchema, UserSchema] | [null, null]>;
} & UserAdapter &
	SessionAdapter;

const getSessionAndUser: (
	sessionId: string
) => Promise<
	[session: SessionSchema, user: UserSchema] | [session: null, user: null]
> = async (sessionId: string) => {
	// get session
	const unparsedSession = await redisClient.get(sessionId);
	if (!unparsedSession) return [null, null];
	const session: SessionSchema = JSON.parse(unparsedSession);
	// get user
	const user = await db
		.select()
		.from(schema.user)
		.where(eq(schema.user.id, session.id))
		.then((res) => res[0]);
	// return [session, user]
	return [session, user];
};

const customAdapter:Adapter = (config: any) => {
	return (luciaError: typeof LuciaError) => ({
		// adapter
	});
};

export default customAdapter;
