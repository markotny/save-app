import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BudgetDto} from '@wydatex/models';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent {
  budgetForm = this.fb.group(BudgetEditComponent.createBudget());

  // TODO: spróbować wywalić static
  static createBudget(): BudgetDto {
    return {
      name: '',
      currencySymbol: 'PLN',
      startDate: null,
      endDate: null,
      budgetCategories: []
    };
  }

  constructor(public fb: FormBuilder) {}
}
