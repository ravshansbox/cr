import crypto from 'node:crypto';
import { userDao } from './daos/users/index.js';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants.js';
import { DbClient } from './pool.js';
import { NoRecordFound } from './exceptions/index.js';

export const seed = async (client: DbClient) => {
  try {
    await userDao.selectByUsername(client, { username: ADMIN_USERNAME });
  } catch (error) {
    if (error instanceof NoRecordFound) {
      const user = await userDao.createUser(client, {
        username: ADMIN_USERNAME,
        password: crypto.hash('sha256', ADMIN_PASSWORD),
        email: `${ADMIN_USERNAME}@cloudretail.pro`,
      });
      await userDao.setUserVerified(client, { id: user.id });
      console.info('Admin user created');
    }
  }
  console.info('Seed complete');
};
