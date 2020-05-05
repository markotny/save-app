import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Budget} from '@wydatex/models';
import {select, Store} from '@ngrx/store';
import {selectSelectedBudget} from '../budget.selectors';
import {BudgetState} from '../budget.state';
import * as BudgetActions from '../budget.actions';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {
  selectedBudget$: Observable<Budget> = this.store.pipe(select(selectSelectedBudget));

  totalBudgeted = 1;

  constructor(private store: Store<BudgetState>) {}

  ngOnInit(): void {}

  remove(b: Budget) {
    this.store.dispatch(BudgetActions.remove({id: b.id}));
  }

  edit(b: Budget) {
    this.store.dispatch(BudgetActions.edit({budget: {id: b.id, totalBudgeted: this.totalBudgeted}}));
  }
}
