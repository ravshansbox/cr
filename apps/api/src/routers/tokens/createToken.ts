import crypto from 'node:crypto';
import express from 'express';
import zod from 'zod';
import { tokenDao } from '../../daos/tokens';
import { userDao } from '../../daos/users';
import { pool } from '../../pool';
import { HttpError } from '../../exceptions';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const handler: express.RequestHandler = async (request, response) => {
  const body = bodySchema.parse(request.body);
  const user = await userDao.selectByUsername(pool, {
    username: body.username,
  });
  if (user.password !== crypto.hash('sha256', body.password)) {
    throw new HttpError(401, 'Invalid username or password');
  }
  const token = await tokenDao.createToken(pool, { userId: user.id });
  response.status(201).json(token);
};

export const createToken = {
  method: 'post' as const,
  path: '/tokens',
  handler,
};
