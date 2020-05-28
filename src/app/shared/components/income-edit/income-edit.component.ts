import {Component} from '@angular/core';
import {Budget} from '@state/budgets';
import {BudgetVM} from '@wydatex/models';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {SelectItem} from 'primeng/api/selectitem';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss']
})
export class IncomeEditComponent {
  date = new Date();

  selectedBudget = (this.config.data.activeBudget as Budget)?.id;

  currency = (this.config.data.activeBudget as Budget)?.currencySymbol || 'PLN';

  budgets = (this.config.data.budgets as BudgetVM[]).map(
    ({id, name}) =>
      ({
        label: name,
        value: id
      } as SelectItem)
  );

  constructor(public config: DynamicDialogConfig) {}
}
