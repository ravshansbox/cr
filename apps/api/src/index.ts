/* eslint-disable @typescript-eslint/no-unsafe-call */
import { runner as pgMigrate } from 'node-pg-migrate';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import { seed } from './seed';
import { pool } from './pool';
import { app } from './app';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });

  await seed(pool);

  app.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
