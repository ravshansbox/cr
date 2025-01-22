import { tokenDao } from '../../daos/tokens/index.js';
import { getAllTokensEndpoint } from '../../endpoints.js';
import { createRoute, HttpResponse, type Fetcher } from '../../http.js';
import { pool } from '../../pool.js';

export const getAllTokens = createRoute({
  endpoint: getAllTokensEndpoint,
  auth: true,
  process: async ({ auth }) => {
    const tokens = await tokenDao.selectByUserId(pool, {
      user_id: auth.user.id,
    });
    return new HttpResponse(200, tokens);
  },
});

export type GetAllTokensFetcher = Fetcher<typeof getAllTokens>;
