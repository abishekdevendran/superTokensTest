import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

const connectionString = process.env.POSTGRES_URL || '';
export const queryClient = postgres(connectionString);
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
