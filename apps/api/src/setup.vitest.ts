import { inject } from 'vitest';
import { createHttpClient } from './test-utils.js';
import { pool } from './pool.js';

declare global {
  // eslint-disable-next-line no-var
  var httpClient: ReturnType<typeof createHttpClient>;
}

beforeAll(() => {
  const baseUrl = inject('baseUrl');
  global.httpClient = createHttpClient(baseUrl);
});

afterEach(async () => {
  await pool.query('delete from user_registrations');
  await pool.query('delete from tokens');
  await pool.query('delete from companies_users');
  await pool.query('delete from companies');
  await pool.query('delete from users');
});
