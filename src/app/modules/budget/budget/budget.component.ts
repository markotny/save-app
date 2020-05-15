import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {BudgetDto} from '@wydatex/models';
import {BudgetActions, Budget} from '@state/budgets';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  add() {
    this.store.dispatch(
      BudgetActions.add({
        startDate: new Date(2010, 1, 20),
        endDate: new Date(),
        name: 'test',
        isActive: false,
        totalBudgeted: 3000,
        disposableIncome: 2000,
        currencySymbol: 'PL',
        budgetCategories: []
      } as BudgetDto)
    );
  }

  edit() {}

  remove(budget: Budget) {
    this.store.dispatch(BudgetActions.remove(budget));
  }
}
