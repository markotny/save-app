import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular/cdk/portal';
import {ModalWrapperComponent} from './modal-wrapper/modal-wrapper.component';
import {StoreModule} from '@ngrx/store';
import {FEATURE_NAME} from './modal.state';
import {modalReducer} from './modal.reducer';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ModalWrapperComponent],
  imports: [CommonModule, PortalModule, SharedModule, StoreModule.forFeature(FEATURE_NAME, modalReducer)],
  exports: [ModalWrapperComponent]
})
export class ModalModule {}
