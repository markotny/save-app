// auto-generated

import {UserBase} from './user-base';
import {Budget} from './budget';

export interface User extends UserBase {
  username: string;
  email: string;
  budgets: Budget[];
}
