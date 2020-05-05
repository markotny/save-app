import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BudgetRoutingModule} from './budget-routing.module';
import {BudgetComponent} from './budget/budget.component';
import {SharedModule} from '@shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {FEATURE_NAME, reducers} from './budget.state';
import {BudgetDetailsComponent} from './budget-details/budget-details.component';

@NgModule({
  declarations: [BudgetComponent, BudgetDetailsComponent],
  imports: [CommonModule, SharedModule, BudgetRoutingModule, StoreModule.forFeature(FEATURE_NAME, reducers)]
})
export class BudgetModule {}
