import {HomeAppModule} from './views/home-app/home-app.module';
import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShellModule} from '@shell/shell.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ShellModule, CoreModule, AppRoutingModule, HomeAppModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
