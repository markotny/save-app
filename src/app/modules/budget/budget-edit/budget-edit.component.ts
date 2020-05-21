import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BudgetDto, BudgetVM} from '@wydatex/models';
import {Id} from '@shared/types';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit {
  id: Id<BudgetVM>;

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

  constructor(public fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.id = this.config.data.id;
      this.budgetForm.setValue(this.config.data.item);
    }
  }

  save() {
    if (this.budgetForm.valid) {
      this.ref.close({id: this.id, item: this.budgetForm.value});
    }
  }
}
