import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomesComponent} from '@modules/incomes/incomes/incomes.component';
import {ActivebudgetIncomesComponent} from '@modules/incomes/activebudget-incomes/activebudget-incomes.component';
import {MobileIncomesDetailsComponent} from '@modules/incomes/mobile-incomes-details/mobile-incomes-details.component';
import {IncomesRoutingModule} from '@modules/incomes/incomes-routing.module';
import {SharedModule} from '@shared/shared.module';
import {TableModule} from 'primeng';
import {IncomesDetailsComponent} from '@modules/incomes/incomes-details/incomes-details.component';
import {MobileActivebudgetIncomesComponent} from '@modules/incomes/mobile-activebudget-incomes/mobile-activebudget-incomes.component';


@NgModule({
  declarations: [IncomesComponent, ActivebudgetIncomesComponent, IncomesDetailsComponent, MobileActivebudgetIncomesComponent, MobileIncomesDetailsComponent],
  imports: [CommonModule, IncomesRoutingModule, SharedModule, TableModule]
})
export class IncomesModule {
}
