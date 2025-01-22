import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { tokenDao } from '../../daos/tokens/index.js';
import { pool } from '../../pool.js';
import { getTokenEndpoint } from '../../endpoints.js';

export const getToken = createRoute({
  endpoint: getTokenEndpoint,
  process: async ({ params }) => {
    const token = await tokenDao.selectById(pool, { id: params.id });
    return new HttpResponse(200, token);
  },
});

export type GetTokenFetcher = Fetcher<typeof getToken>;
