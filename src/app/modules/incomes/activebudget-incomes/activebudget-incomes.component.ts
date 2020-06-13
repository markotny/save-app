import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';

import {IncomeActions, IncomeExtended, IncomeSelectors} from '@state/incomes';
import {IncomesComponent} from '@modules/incomes/incomes/incomes.component';

@Component({
  selector: 'app-activebudget-incomes',
  templateUrl: './activebudget-incomes.component.html',
  styleUrls: ['./activebudget-incomes.component.scss']
})
export class ActivebudgetIncomesComponent implements OnInit, OnDestroy {
  incomeList$ = this.store.select(IncomeSelectors.extended);
  displayDetails = false;
  selectedIncome: IncomeExtended = undefined;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  editExpense(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeExpense(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

  showDetails(income: IncomeExtended) {
    this.displayDetails = true;
    this.selectedIncome = income;
  }
}
