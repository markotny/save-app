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
import {MobShowHideDirective, MobStyleDirective, MobClassDirective} from './layout/directives/mob.directives';
import {GtMobShowHideDirective, GtMobClassDirective, GtMobStyleDirective} from './layout/directives/gt-mob.directives';
import {MobileBreakPointsProvider} from './layout/mobile-breakpoints.provider';

@NgModule({
  declarations: [
    DropdownMenuComponent,
    VarDirective,
    FadeDirective,
    MobShowHideDirective,
    MobClassDirective,
    MobStyleDirective,
    GtMobShowHideDirective,
    GtMobClassDirective,
    GtMobStyleDirective
  ],
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
    DropdownMenuComponent,
    VarDirective,
    FadeDirective,
    MobShowHideDirective,
    MobClassDirective,
    MobStyleDirective,
    GtMobShowHideDirective,
    GtMobClassDirective,
    GtMobStyleDirective,

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
  providers: [MobileBreakPointsProvider]
})
export class SharedModule {}
