import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainAppComponent} from '@shell/main-app/main-app.component';

import {AuthCallbackComponent} from './core/auth/auth-callback/auth-callback.component';
import {AuthCallback} from './core/auth/auth-callback/auth-callback.enum';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

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
  },
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'app',
    component: MainAppComponent,
    // canActivate: [AuthGuard],
    children: appRoutes
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
