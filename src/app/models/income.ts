// auto-generated

import {ModelBase} from './model-base';
import {Budget} from './budget';
import {RecurrenceTypes} from './recurrence-types';

export interface Income extends ModelBase {
  budget: Budget;
  budgetId: number;
  name: string;
  amount: number;
  label: string;
  date: Date;
  isRecurrent: boolean;
  recurrencePeriod: number;
  periodType: RecurrenceTypes;
}
