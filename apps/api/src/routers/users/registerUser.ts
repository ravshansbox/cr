import crypto from 'node:crypto';
import zod from 'zod';
import * as remeda from 'remeda';
import { registerUserEndpoint } from '../../endpoints.js';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { wrapIntoTransaction } from '../../pool.js';
import { userDao } from '../../daos/users/index.js';
import { userRegistrationDao } from '../../daos/userRegistrations/index.js';

export const registerUser = createRoute({
  endpoint: registerUserEndpoint,
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  process: async ({ body }) => {
    const { user, userRegistration } = await wrapIntoTransaction(
      async (client) => {
        const user = await userDao.createUser(client, {
          username: body.username,
          password: crypto.hash('sha256', body.password),
        });
        const userRegistration =
          await userRegistrationDao.createUserRegistration(client, {
            user_id: user.id,
            confirmation_code: crypto.randomBytes(16).toString('hex'),
            valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000),
          });
        return { user, userRegistration };
      },
    );
    return new HttpResponse(201, {
      user: remeda.omit(user, ['password']),
      registration_valid_until: userRegistration.valid_until,
    });
  },
});

export type RegisterUserFetcher = Fetcher<typeof registerUser>;
