import http from 'node:http';
import { migrateUp } from '@ravshansbox/pg-migrate';
import { seed } from './seed.js';
import { pool } from './pool.js';
import { app } from './app.js';
import { HTTP_PORT } from './constants.js';

(async () => {
  await migrateUp();

  await seed(pool);

  const server = http.createServer((request, response) => {
    app.lookup(request, response);
  });
  server.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
