import {NgModule} from '@angular/core';
import {WelcomeAppComponent} from './welcome-app/welcome-app.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [WelcomeAppComponent],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule {}
