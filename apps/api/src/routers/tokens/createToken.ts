import crypto from 'node:crypto';
import zod from 'zod';
import { tokenDao } from '../../daos/tokens/index.js';
import { userDao } from '../../daos/users/index.js';
import { pool } from '../../pool.js';
import { HttpError } from '../../exceptions/index.js';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { createTokenEndpoint } from '../../endpoints.js';
import { tryCatch } from '../../tryCatch.js';

export const createToken = createRoute({
  endpoint: createTokenEndpoint,
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  process: async ({ body }) => {
    const userQuery = await tryCatch(() =>
      userDao.selectByUsername(pool, {
        username: body.username,
      }),
    );
    if (
      !userQuery.ok ||
      userQuery.output.password !== crypto.hash('sha256', body.password)
    ) {
      throw new HttpError(401, 'Invalid username or password');
    }
    const token = await tokenDao.createToken(pool, {
      userId: userQuery.output.id,
    });
    return new HttpResponse(201, token);
  },
});

export type CreateTokenFetcher = Fetcher<typeof createToken>;
