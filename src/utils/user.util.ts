import omit = require('lodash.omit');

import { User, UserWithoutPassword } from 'src/user/user.model';

export const hidePassword = (user: User): UserWithoutPassword => {
  return omit(user, ['password']);
};
