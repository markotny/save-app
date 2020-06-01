import {Component, OnInit, Input} from '@angular/core';
import {AppState} from '@core/core.state';
import {Store} from '@ngrx/store';
import {BudgetSelectors} from '@state/budgets';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-table-content',
  templateUrl: './dashboard-table-content.component.html',
  styleUrls: ['./dashboard-table-content.component.scss']
})
export class DashboardTableContentComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() model: any;
  currencyLabel$ = this.store.select(BudgetSelectors.active).pipe(map(b => b?.currencySymbol));
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
