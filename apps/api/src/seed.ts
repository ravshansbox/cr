import crypto from 'node:crypto';
import { userDao } from './daos/users';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';
import { DbClient } from './pool';
import { NoRecordFound } from './exceptions';

export const seed = async (client: DbClient) => {
  try {
    await userDao.selectByUsername(client, { username: ADMIN_USERNAME });
  } catch (error) {
    if (error instanceof NoRecordFound) {
      await userDao.createUser(client, {
        username: ADMIN_USERNAME,
        password: crypto.hash('sha256', ADMIN_PASSWORD),
      });
      console.info('Admin user created');
    }
  }
  console.info('Seed complete');
};
