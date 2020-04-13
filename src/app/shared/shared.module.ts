import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    // angular
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    // ngx
    NgxSpinnerModule,

    // primeng
    ToolbarModule,
	MenuModule,
	PanelMenuModule,
    ButtonModule,
    SidebarModule,
    ToastModule
  ],
  exports: [
    // angular
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    // ngx
    NgxSpinnerModule,

    // primeng
    ToolbarModule,
	MenuModule,
	PanelMenuModule,
    ButtonModule,
    SidebarModule,
    ToastModule
  ]
})
export class SharedModule {}
