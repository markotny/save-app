import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomeAppComponent} from './shell/welcome-app/welcome-app.component';
import {ShellModule} from '@shell/shell.module';

@NgModule({
  declarations: [AppComponent, WelcomeAppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ShellModule, CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
