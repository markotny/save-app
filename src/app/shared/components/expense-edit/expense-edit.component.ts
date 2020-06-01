import {Component} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {CategoryVM, BudgetVM} from '@wydatex/models';
import {SelectItem} from 'primeng/api/selectitem';
import {Budget} from '@state/budgets';

const toSelectItem = ({id, name}) =>
  ({
    label: name,
    value: id
  } as SelectItem);

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent {
  date = new Date();

  selectedBudget = (this.config.data.activeBudget as Budget)?.id;

  currency = (this.config.data.activeBudget as Budget)?.currencySymbol || 'PLN';

  categories = (this.config.data.categories as CategoryVM[]).map(toSelectItem);

  budgets = (this.config.data.budgets as BudgetVM[]).map(toSelectItem);

  constructor(public config: DynamicDialogConfig) {}
}
