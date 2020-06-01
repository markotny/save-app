import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Income, IncomeActions, IncomeSelectors} from '@state/incomes';

@Component({
  selector: 'app-mobile-activebudget-incomes',
  templateUrl: './mobile-activebudget-incomes.component.html',
  styleUrls: ['./mobile-activebudget-incomes.component.scss']
})
export class MobileActivebudgetIncomesComponent implements OnInit {

  incomeList$ = this.store.select(IncomeSelectors.all);
  displayDetails = false;
  selectedIncome: Income = {amount: 0, budgetId: 0, date: undefined, label: '', name: '', id: -1};

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  editIncome(item: Income) {
    this.store.dispatch(IncomeActions.editDialog({item}));
  }
  removeIncome(item: Income) {
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

  showDetails(income: Income) {
    this.displayDetails = true;
    this.selectedIncome = income;
  }

}
