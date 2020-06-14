import {Component} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {IncomeActions, IncomeExtended, IncomeSelectors} from '@state/incomes';
import {IncomesComponent} from '@modules/incomes/incomes/incomes.component';

@Component({
  selector: 'app-activebudget-incomes',
  templateUrl: './activebudget-incomes.component.html',
  styleUrls: ['./activebudget-incomes.component.scss']
})
export class ActivebudgetIncomesComponent {
  incomeList$ = this.store.select(IncomeSelectors.extended);
  displayDetails = false;
  selectedIncome: IncomeExtended = undefined;

  constructor(private store: Store<AppState>) {}

  editExpense(event: Event, income: IncomeExtended) {
    event.stopPropagation();
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeExpense(event: Event, income: IncomeExtended) {
    event.stopPropagation();
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

  showDetails(income: IncomeExtended) {
    this.displayDetails = true;
    this.selectedIncome = income;
  }
}
