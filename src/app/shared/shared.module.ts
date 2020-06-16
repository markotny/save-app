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
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {VarDirective} from './directives/app-var.directive';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {FadeDirective} from './directives/fade.directive';
import {MobShowHideDirective, MobStyleDirective, MobClassDirective} from './layout/directives/mob.directives';
import {GtMobShowHideDirective, GtMobClassDirective, GtMobStyleDirective} from './layout/directives/gt-mob.directives';
import {MobileBreakPointsProvider} from './layout/mobile-breakpoints.provider';
import {ModalWrapperComponent} from './components/modal-wrapper/modal-wrapper.component';
import {ModalRemoveComponent} from './components/modal-remove/modal-remove.component';
import {CategoryEditComponent} from './components/category-edit/category-edit.component';
import {ExpenseEditComponent} from './components/expense-edit/expense-edit.component';
import {IncomeEditComponent} from './components/income-edit/income-edit.component';
import {TableModule} from 'primeng/table';

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
    ModalWrapperComponent,
    ModalRemoveComponent,
    CategoryEditComponent,
    ExpenseEditComponent,
    IncomeEditComponent
  ],
  imports: [
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
    DynamicDialogModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    SpinnerModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    ScrollPanelModule,
    TableModule,

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
    DynamicDialogModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    SpinnerModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    ScrollPanelModule
  ],
  providers: [MobileBreakPointsProvider]
})
export class SharedModule {}
