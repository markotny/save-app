import {NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';
import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MainAppComponent} from './main-app/main-app.component';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, MainAppComponent],
  imports: [CoreModule]
})
export class ShellModule {}
