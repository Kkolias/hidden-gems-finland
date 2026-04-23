import { Database } from "./types/db"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
// DEV
// import "dotenv/config";

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_PORT = process.env.DATABASE_PORT as string;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const DATABASE_URL = process.env.DATABASE_URL;

const devConfigs = {
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: parseInt(DATABASE_PORT) || 5432,
  max: 10,
};

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: IS_PRODUCTION ? DATABASE_URL : undefined,
    ...(!IS_PRODUCTION ? devConfigs : {}),
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
