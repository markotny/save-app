import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {IncomeActions, IncomeExtended} from '@state/incomes';
import {IncomesComponent} from '@modules/incomes/incomes/incomes.component';

@Component({
  selector: 'app-mobile-incomes-details',
  templateUrl: './mobile-incomes-details.component.html',
  styleUrls: ['./mobile-incomes-details.component.scss']
})
export class MobileIncomesDetailsComponent implements OnInit {

  @Input() income: IncomeExtended;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editIncome(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.editDialog({item}));
  }

  removeIncome(income: IncomeExtended) {
    const item = IncomesComponent.toIncomeType(income);
    this.store.dispatch(IncomeActions.removeDialog(item));
  }

}
