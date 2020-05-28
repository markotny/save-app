import {Component, OnInit} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {CategorySelectors} from '@state/categories';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {
  popularCategoryList$ = this.store.select(CategorySelectors.activeBudgetSums).pipe(
    map(cl => cl.filter(c => c.spent > 0)),
    map(cl => cl.sort((a, b) => b.spent - a.spent)),
    map(cl => cl.slice(0, 10))
  );
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
