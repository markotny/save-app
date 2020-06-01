import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Income, IncomeActions} from '@state/incomes';

@Component({
  selector: 'app-mobile-incomes-details',
  templateUrl: './mobile-incomes-details.component.html',
  styleUrls: ['./mobile-incomes-details.component.scss']
})
export class MobileIncomesDetailsComponent implements OnInit {

  @Input() income: Income;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editIncome(item: Income) {
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeIncome(item: Income) {
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

}
