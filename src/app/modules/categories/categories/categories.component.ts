import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CategorySelectors} from '@state/categories';
import {AppState} from '@core/core.state';
import {Subscription} from 'rxjs';
import {BudgetSelectors, Budget} from '@state/budgets';
import {CategoryVM} from '@wydatex/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  allCategories$ = this.store.select(CategorySelectors.all);
  allCategories: CategoryVM[];
  activeCategories$ = this.store.select(CategorySelectors.activeBudget);
  activeCategories = {};
  activeBudget$ = this.store.select(BudgetSelectors.active);
  activeBudget: Budget;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.allCategories$.subscribe(o => (this.allCategories = o)),
      this.activeCategories$.subscribe(o => (this.activeCategories = o)),
      this.activeBudget$.subscribe(o => (this.activeBudget = o))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
