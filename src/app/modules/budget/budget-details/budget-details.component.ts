import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Budget} from '@wydatex/models';
import {select, Store} from '@ngrx/store';
import {selectSelectedBudget} from '../budget.selectors';
import {BudgetState} from '../budget.state';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {
  selectedBudget$: Observable<Budget> = this.store.pipe(select(selectSelectedBudget));

  constructor(private store: Store<BudgetState>) {}

  ngOnInit(): void {}
}
