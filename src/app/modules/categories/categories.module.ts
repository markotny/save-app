import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesRoutingModule} from '@modules/categories/categories-routing.module';
import {TableModule} from 'primeng';



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableModule
  ]
})
export class CategoriesModule {
}
