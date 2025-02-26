import crypto from 'node:crypto';
import zod from 'zod';
import * as remeda from 'remeda';
import { registerUserEndpoint } from '../../endpoints.js';
import { createRoute, Fetcher, HttpResponse } from '../../http.js';
import { wrapIntoTransaction } from '../../pool.js';
import { userDao } from '../../daos/users/index.js';
import { userRegistrationDao } from '../../daos/userRegistrations/index.js';
import { transporter } from '../../transporter.js';
import { MAIL_CONFIRMATION_URL, MAIL_USERNAME } from '../../constants.js';

export const registerUser = createRoute({
  endpoint: registerUserEndpoint,
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
    email: zod.string().email(),
  }),
  process: async ({ body }) => {
    const { user, userRegistration } = await wrapIntoTransaction(
      async (client) => {
        const user = await userDao.createUser(client, {
          username: body.username,
          password: crypto.hash('sha256', body.password),
          email: body.email,
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
    await transporter.sendMail({
      from: MAIL_USERNAME,
      to: user.email,
      subject: 'Confirm your email',
      text: `Please confirm your email by clicking the following link: ${MAIL_CONFIRMATION_URL}/${userRegistration.confirmation_code}`,
    });
    return new HttpResponse(201, {
      user: remeda.omit(user, ['password']),
      registration_valid_until: userRegistration.valid_until,
    });
  },
});

export type RegisterUserFetcher = Fetcher<typeof registerUser>;
