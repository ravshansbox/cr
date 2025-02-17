import { createToken } from './createToken.js';
import { deleteToken } from './deleteToken.js';
import { selectById } from './selectById.js';
import { selectByUserId } from './selectByUserId.js';

export const tokenDao = {
  createToken,
  deleteToken,
  selectById,
  selectByUserId,
};
