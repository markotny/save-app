// auto-generated

import {ModelBase} from './model-base';
import {Expense} from './expense';
import {BudgetCategory} from './budget-category';

export interface Category extends ModelBase {
  name: string;
  expenses: Expense[];
  budgetCategories: BudgetCategory[];
}
