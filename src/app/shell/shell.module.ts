import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MainAppComponent} from './main-app/main-app.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, MainAppComponent],
  imports: [SharedModule]
})
export class ShellModule {}
