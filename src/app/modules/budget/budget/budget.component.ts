import {Component, OnInit} from '@angular/core';
import {Budget} from '@wydatex/models';
import {BudgetState} from '../budget.state';
import {Store, select} from '@ngrx/store';
import {selectAllBudgets, selectSelectedBudget} from '../budget.selectors';
import {Observable} from 'rxjs';
import * as BudgetActions from '../budget.actions';
import {MenuItem} from 'primeng/api/menuitem';
import {map, share} from 'rxjs/operators';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  selectedBudget$: Observable<Budget> = this.store.pipe(select(selectSelectedBudget), share());

  budgetSelectMenuItems$: Observable<MenuItem[]> = this.store.pipe(
    select(selectAllBudgets),
    map(x => x.map(b => ({label: b.name, routerLink: [b.id]})))
  );

  constructor(private store: Store<BudgetState>) {}

  ngOnInit(): void {}

  add(budget: Budget) {
    this.store.dispatch(
      BudgetActions.add({
        startDate: new Date(2010, 1, 20),
        endDate: new Date(),
        name: 'test',
        totalBudgeted: 3000,
        disposableIncome: 2000,
        currencySymbol: 'PL',
        budgetCategories: []
      } as Budget)
    );
  }

  edit(budget: Budget) {}

  remove(budget: Budget) {
    this.store.dispatch(BudgetActions.remove({id: budget.id}));
  }
}
