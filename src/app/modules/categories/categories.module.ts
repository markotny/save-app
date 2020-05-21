import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesRoutingModule} from '@modules/categories/categories-routing.module';
import {TableModule} from 'primeng';
import {SharedModule} from '@shared/shared.module';



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
