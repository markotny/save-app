// auto-generated

import {ModelBase} from './model-base';
import {Income} from './income';
import {Expense} from './expense';
import {BudgetCategory} from './budget-category';

export interface Budget extends ModelBase {
  startDate: Date;
  endDate: Date;
  name: string;
  totalBudgeted: number;
  disposableIncome: number;
  currencySymbol: string;
  isActive: boolean;
  incomes: Income[];
  expenses: Expense[];
  budgetCategories: BudgetCategory[];
}
