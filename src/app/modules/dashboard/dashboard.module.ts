import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '@shared/shared.module';
import {DesktopSumsHeaderComponent} from './desktop-sums-header/desktop-sums-header.component';
import {CircleChartComponent} from './circle-chart/circle-chart.component';
import {MobileSumsHeaderComponent} from './mobile-sums-header/mobile-sums-header.component';
import {PopularCategoriesComponent} from './popular-categories/popular-categories.component';
import {RecentTransactionsComponent} from './recent-transactions/recent-transactions.component';
import { DashboardTableContentComponent } from './dashboard-table-content/dashboard-table-content.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DesktopSumsHeaderComponent,
    CircleChartComponent,
    MobileSumsHeaderComponent,
    PopularCategoriesComponent,
    RecentTransactionsComponent,
    DashboardTableContentComponent
  ],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
