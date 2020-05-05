import {Component, OnInit} from '@angular/core';
import {Budget} from '@wydatex/models';
import {BudgetState} from '../budget.state';
import {Store, select} from '@ngrx/store';
import {selectAllBudgets, selectSelectedBudget} from '../budget.selectors';
import {Observable} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budgets$: Observable<Budget[]> = this.store.pipe(select(selectAllBudgets));
  selectedBudget$: Observable<Budget> = this.store.pipe(select(selectSelectedBudget));

  constructor(private store: Store<BudgetState>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  select(budget: Budget) {
    this.router.navigate([budget.id], {relativeTo: this.route});
  }
}
