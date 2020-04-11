import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreModule} from '@core/core.module';

import {HeaderModule} from '@shell/header/header.module';

import {MainAppComponent} from './main-app.component';

@NgModule({
  declarations: [MainAppComponent],
  imports: [CommonModule, CoreModule, HeaderModule]
})
export class MainAppModule {}
