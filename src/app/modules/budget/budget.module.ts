import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetRoutingModule} from './budget-routing.module';
import {BudgetComponent} from './budget/budget.component';
import {SharedModule} from '@shared/shared.module';
import {BudgetDetailsComponent} from './budget-details/budget-details.component';

@NgModule({
  declarations: [BudgetComponent, BudgetDetailsComponent],
  imports: [CommonModule, SharedModule, BudgetRoutingModule]
})
export class BudgetModule {}
