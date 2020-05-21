import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpenseRoutingModule} from './expense-routing.module';
import {ExpenseComponent} from './expense/expense.component';
import {ActivebudgetExpensesComponent} from './activebudget-expenses/activebudget-expenses.component';
import {ExpenseDetailsComponent} from './expense-details/expense-details.component';
import {MobileActivebudgetExpensesComponent} from './mobile-activebudget-expenses/mobile-activebudget-expenses.component';

@NgModule({
  declarations: [ExpenseComponent, ActivebudgetExpensesComponent, ExpenseDetailsComponent, MobileActivebudgetExpensesComponent],
  imports: [CommonModule, ExpenseRoutingModule]
})
export class ExpenseModule {}
