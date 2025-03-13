import { inject } from 'vitest';
import { createHttpClient } from './test-utils.js';

declare global {
  // eslint-disable-next-line no-var
  var httpClient: ReturnType<typeof createHttpClient>;
}

beforeAll(() => {
  const baseUrl = inject('baseUrl');
  global.httpClient = createHttpClient(baseUrl);
});
