import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetRoutingModule} from './budget-routing.module';
import {SharedModule} from '@shared/shared.module';
import {BudgetOverviewComponent} from './budget-overview/budget-overview.component';
import {BudgetChartComponent} from './budget-chart/budget-chart.component';
import {BudgetCategoriesComponent} from './budget-categories/budget-categories.component';
import {BudgetEditComponent} from './budget-edit/budget-edit.component';
import {DatesConflictDirective} from './budget-edit/dates-conflict.directive';

@NgModule({
  declarations: [BudgetOverviewComponent, BudgetChartComponent, BudgetCategoriesComponent, BudgetEditComponent, DatesConflictDirective],
  imports: [CommonModule, SharedModule, BudgetRoutingModule]
})
export class BudgetModule {}
