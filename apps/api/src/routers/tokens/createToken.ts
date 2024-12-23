import { tokenDao } from '../../daos/tokens';
import { userDao } from '../../daos/users';
import { pool } from '../../pool';
import zod from 'zod';
import crypto from 'node:crypto';
import { HttpError } from '../../exceptions';
import express from 'express';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export const createToken = async (
  request: express.Request,
  response: express.Response,
) => {
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
