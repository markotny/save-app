// auto-generated

import {ModelBase} from './model-base';
import {Budget} from './budget';
import {Category} from './category';
import {RecurrenceTypes} from './recurrence-types';

export interface Expense extends ModelBase {
  budget: Budget;
  budgetId: number;
  category: Category;
  categoryId: number;
  name: string;
  amount: number;
  label: string;
  date: Date;
  isRecurrent: boolean;
  recurrencePeriod: number;
  periodType: RecurrenceTypes;
}
