import { tokenDao } from './daos/tokens';
import { userDao } from './daos/users';
import { HttpError } from './exceptions';
import { pool } from './pool';

export const parseAuth = async (authorizationHeader?: string) => {
  if (!authorizationHeader)
    throw new HttpError(401, 'Invalid Authorization header');
  const parsed = /^Bearer (.*)$/.exec(authorizationHeader);
  if (parsed === null) throw new HttpError(401, 'Invalid Authorization header');
  const tokenId = parsed[1];
  if (!tokenId) throw new HttpError(401, 'Invalid bearer token');
  const token = await tokenDao.selectById(pool, { id: tokenId });
  const user = await userDao.selectById(pool, { id: token.user_id });
  return { token, user };
};
