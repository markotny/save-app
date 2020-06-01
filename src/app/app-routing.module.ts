import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainAppComponent} from '@shell/main-app/main-app.component';
import {AuthCallbackComponent} from './core/auth/auth-callback/auth-callback.component';
import {AuthCallback} from './core/auth/auth-callback/auth-callback.enum';
import {AuthGuard} from '@core/index';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('@modules/budget/budget.module').then(m => m.BudgetModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('@modules/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'expense',
    loadChildren: () => import('@modules/expense/expense.module').then(m => m.ExpenseModule)
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
    canActivate: [AuthGuard],
    children: appRoutes
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
