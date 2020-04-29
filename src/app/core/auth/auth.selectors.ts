import {createFeatureSelector} from '@ngrx/store';
import {ɵa as OidcState} from 'ng-oidc-client';

export const selectOidcState = createFeatureSelector<OidcState>('oidc');
