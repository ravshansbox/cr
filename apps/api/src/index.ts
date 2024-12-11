/* eslint-disable @typescript-eslint/no-unsafe-call */
import { runner as pgMigrate } from 'node-pg-migrate';
import { DATABASE_URL, MIGRATIONS_DIR, MIGRATIONS_TABLE } from './constants';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });
})().catch(console.error);
