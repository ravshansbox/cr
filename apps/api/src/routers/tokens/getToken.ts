import zod from 'zod';
import {
  createHandler,
  createRoute,
  Endpoint,
  Fetcher,
  HttpResponse,
} from '../../http';
import { tokenDao } from '../../daos/tokens';
import { pool } from '../../pool';

export const getToken = createRoute({
  endpoint: new Endpoint<{ id: number }>('get', '/tokens/:id'),
  handler: createHandler({
    bodySchema: zod.object({}),
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, { id: params.id });
      return new HttpResponse(200, token);
    },
  }),
});

export type GetTokenFetcher = Fetcher<typeof getToken.handler>;
