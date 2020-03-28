import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthCallbackComponent} from './core/auth/auth-callback/auth-callback.component';
import {AuthCallback} from './core/auth/auth-callback/auth-callback.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-callback',
    component: AuthCallbackComponent,
    data: {action: AuthCallback.Login}
  },
  {
    path: 'register-callback',
    component: AuthCallbackComponent,
    data: {action: AuthCallback.Register}
  },
  {
    path: 'silent-refresh',
    component: AuthCallbackComponent,
    data: {action: AuthCallback.SilentRefresh}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
