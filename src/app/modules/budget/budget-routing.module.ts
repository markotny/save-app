import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BudgetOverviewComponent} from './budget-overview/budget-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: BudgetOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {}
