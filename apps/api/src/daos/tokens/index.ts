import { createToken } from './createToken.js';
import { selectById } from './selectById.js';
import { selectByUserId } from './selectByUserId.js';

export const tokenDao = {
  createToken,
  selectById,
  selectByUserId,
};
