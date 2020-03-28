import {AuthGuard} from './auth/auth.guard';
import {AppState, reducers, metaReducers} from './core.state';
import {selectTheme} from './settings/settings.selectors';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TokenInterceptor} from './http-interceptors/token.interceptor';
import {NgModule, ErrorHandler} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './http-interceptors/http-error.interceptor';
import {StoreModule} from '@ngrx/store';
import {environment} from '@env/environment';
import {EffectsModule} from '@ngrx/effects';
import {NgOidcClientModule} from 'ng-oidc-client';
import {AppErrorHandler} from './error-handler/app-error-handler.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationService} from './notifications/notification.service';
import {LocalStorageService} from './local-storage/local-storage.service';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsEffects} from './settings/settings.effects';

export {
  AppState,
  LocalStorageService,
  AuthGuard,
  NotificationService,
  selectTheme
};

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [
    //angular
    CommonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,

    //ngx
    NgxSpinnerModule,

    //material
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,

    //ngrx
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([SettingsEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: environment.appName
        }),

    NgOidcClientModule.forRoot({
      /* eslint-disable @typescript-eslint/camelcase */
      oidc_config: {
        authority: environment.authServerUri,
        client_id: environment.appName,
        response_type: 'code',
        scope: 'openid profile email api.read',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        redirect_uri: `${environment.thisUri}/login-callback`,
        post_logout_redirect_uri: `${environment.thisUri}/`,
        silent_redirect_uri: `${environment.thisUri}/silent-refresh`
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  exports: [
    AuthCallbackComponent,
    FormsModule,
    FlexLayoutModule,

    //ngx
    NgxSpinnerModule,

    //material
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class CoreModule {}
