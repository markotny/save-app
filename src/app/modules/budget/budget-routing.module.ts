import {BudgetComponent} from './budget/budget.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BudgetDetailsComponent} from './budget-details/budget-details.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
    children: [
      {
        path: ':id',
        component: BudgetDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {}
