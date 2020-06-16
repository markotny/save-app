import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {IncomeActions, IncomeExtended, IncomeSelectors} from '@state/incomes';
import {IncomesComponent} from '@modules/incomes/incomes/incomes.component';

@Component({
  selector: 'app-mobile-activebudget-incomes',
  templateUrl: './mobile-activebudget-incomes.component.html',
  styleUrls: ['./mobile-activebudget-incomes.component.scss']
})
export class MobileActivebudgetIncomesComponent implements OnInit {

  incomeList$ = this.store.select(IncomeSelectors.extended);
  displayDetails = false;
  selectedIncome: IncomeExtended = undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  editIncome(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.editDialog({item}));
  }
  removeIncome(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

  showDetails(income: IncomeExtended) {
    this.displayDetails = true;
    this.selectedIncome = income;
  }

}
