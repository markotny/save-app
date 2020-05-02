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
import {CheckboxModule} from 'primeng/checkbox';
import {VarDirective} from './directives/app-var.directive';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {FadeDirective} from './directives/fade.directive';

@NgModule({
  declarations: [VarDirective, FadeDirective, DropdownMenuComponent],
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
    ToastModule,
    CheckboxModule
  ],
  exports: [
    VarDirective,
    FadeDirective,
    DropdownMenuComponent,

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
    ToastModule,
    CheckboxModule
  ]
})
export class SharedModule {}
