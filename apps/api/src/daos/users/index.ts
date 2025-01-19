import { createUser } from './createUser.js';
import { selectById } from './selectById.js';
import { selectByUsername } from './selectByUsername.js';

export const userDao = {
  createUser,
  selectById,
  selectByUsername,
};
