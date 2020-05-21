import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {VarDirective} from './directives/app-var.directive';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {FadeDirective} from './directives/fade.directive';
import {MobShowHideDirective, MobStyleDirective, MobClassDirective} from './layout/directives/mob.directives';
import {GtMobShowHideDirective, GtMobClassDirective, GtMobStyleDirective} from './layout/directives/gt-mob.directives';
import {MobileBreakPointsProvider} from './layout/mobile-breakpoints.provider';
import {ModalWrapperComponent} from './components/modal-wrapper/modal-wrapper.component';

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
    GtMobStyleDirective,
    ModalWrapperComponent
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
    CheckboxModule,
    CardModule,
    ProgressBarModule,
    ChartModule,
    DialogModule,
    DynamicDialogModule
  ],
  exports: [
    DropdownMenuComponent,
    ModalWrapperComponent,
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
    ReactiveFormsModule,
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
    CheckboxModule,
    CardModule,
    ProgressBarModule,
    ChartModule,
    DialogModule,
    DynamicDialogModule
  ],
  providers: [MobileBreakPointsProvider]
})
export class SharedModule {}
