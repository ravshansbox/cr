import * as remeda from 'remeda';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { tokenDao } from '../../daos/tokens/index.js';
import { pool } from '../../pool.js';
import { getTokenEndpoint } from '../../endpoints.js';
import { userDao } from '../../daos/users/index.js';

export const getToken = createRoute({
  endpoint: getTokenEndpoint,
  process: async ({ params }) => {
    const token = await tokenDao.selectById(pool, { id: params.id });
    const user = await userDao.selectById(pool, { id: token.user_id });
    return new HttpResponse(200, {
      ...token,
      user: remeda.omit(user, ['password']),
    });
  },
});

export type GetTokenFetcher = Fetcher<typeof getToken>;
