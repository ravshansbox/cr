 
import { migrateUp } from '@ravshansbox/pg-migrate';
import { HTTP_PORT } from './constants.js';
import { seed } from './seed.js';
import { pool } from './pool.js';
import { app } from './app.js';

(async () => {
  await migrateUp();

  await seed(pool);

  app.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
