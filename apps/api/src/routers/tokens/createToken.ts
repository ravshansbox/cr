import crypto from 'node:crypto';
import zod from 'zod';
import { tokenDao } from '../../daos/tokens';
import { userDao } from '../../daos/users';
import { pool } from '../../pool';
import { HttpError } from '../../exceptions';
import { createHandler, createRoute, Fetcher, HttpResponse } from '../../http';
import { createTokenEndpoint } from '../../endpoints';
import { tryCatch } from '../../tryCatch';

export const createToken = createRoute({
  endpoint: createTokenEndpoint,
  handler: createHandler({
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
  }),
});

export type CreateTokenFetcher = Fetcher<typeof createToken.handler>;
