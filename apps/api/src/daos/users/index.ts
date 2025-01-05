import { createUser } from './createUser';
import { selectById } from './selectById';
import { selectByUsername } from './selectByUsername';

export const userDao = {
  createUser,
  selectById,
  selectByUsername,
};
