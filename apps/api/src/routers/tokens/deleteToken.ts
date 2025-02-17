import { tokenDao } from '../../daos/tokens/index.js';
import { deleteTokenEndpoint } from '../../endpoints.js';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { pool } from '../../pool.js';

export const deleteToken = createRoute({
  endpoint: deleteTokenEndpoint,
  process: async ({ params }) => {
    await tokenDao.deleteToken(pool, { id: params.id });
    return new HttpResponse(200, {});
  },
});

export type DeleteTokenFetcher = Fetcher<typeof deleteToken>;
