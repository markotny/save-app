import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetRoutingModule} from './budget-routing.module';
import {SharedModule} from '@shared/shared.module';
import {BudgetOverviewComponent} from './budget-overview/budget-overview.component';
import {BudgetAddComponent} from './budget-add/budget-add.component';
import {BudgetEditComponent} from './budget-edit/budget-edit.component';
import {BudgetRemoveComponent} from './budget-remove/budget-remove.component';
import {BudgetChartComponent} from './budget-chart/budget-chart.component';
import {BudgetCategoriesComponent} from './budget-categories/budget-categories.component';
import {DatesConflictDirective} from './budget-edit/dates-conflict.directive';

@NgModule({
  declarations: [
    BudgetOverviewComponent,
    BudgetAddComponent,
    BudgetEditComponent,
    BudgetRemoveComponent,
    BudgetChartComponent,
    BudgetCategoriesComponent
  ],
  exports: [
    BudgetCategoriesComponent
  ],
  imports: [CommonModule, SharedModule, BudgetRoutingModule]
})
export class BudgetModule {}
