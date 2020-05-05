import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetRoutingModule} from './budget-routing.module';
import {BudgetComponent} from './budget/budget.component';
import {SharedModule} from '@shared/shared.module';
import {StoreModule, Store} from '@ngrx/store';
import {FEATURE_NAME, reducers} from './budget.state';
import {BudgetDetailsComponent} from './budget-details/budget-details.component';
import {BudgetService} from './budget.service';
import {EffectsModule} from '@ngrx/effects';
import {BudgetEffects} from './budget.effects';
import * as BudgetActions from './budget.actions';

@NgModule({
  declarations: [BudgetComponent, BudgetDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BudgetRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([BudgetEffects])
  ],
  providers: [BudgetService]
})
export class BudgetModule {
  constructor(store: Store) {
    store.dispatch(BudgetActions.load());
  }
}
