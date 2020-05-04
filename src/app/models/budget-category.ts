// auto-generated

import {ModelBase} from './model-base';
import {Budget} from './budget';
import {Category} from './category';

export interface BudgetCategory extends ModelBase {
  budgetId: number;
  budget: Budget;
  categoryId: number;
  category: Category;
  moneyBudgeted: number;
  moneySpent: number;
}
