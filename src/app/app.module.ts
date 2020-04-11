import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@shell/header/header.component';
import {SidenavComponent} from '@shell/sidenav/sidenav.component';
import { WelcomeAppComponent } from './shell/welcome-app/welcome-app.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidenavComponent, WelcomeAppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
