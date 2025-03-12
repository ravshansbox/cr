import { checkHealthEndpoint } from '../endpoints.js';
import { createRoute, Fetcher, HttpResponse } from '../http.js';

export const checkHealth = createRoute({
  endpoint: checkHealthEndpoint,
  process: () => new HttpResponse(200, { status: 'ok' }),
});

export type CheckHealthFetcher = Fetcher<typeof checkHealth>;
