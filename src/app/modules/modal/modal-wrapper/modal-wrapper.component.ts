import {Component, OnInit, ViewChild, OnDestroy, Injector} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {State} from '../modal.state';
import {selectOpen, selectRef} from '../modal.selectors';
import {CdkPortalOutlet, PortalOutlet, Portal, ComponentPortal} from '@angular/cdk/portal';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BudgetSelectors} from '@state/budgets';
import {ModalActions} from '..';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, OnDestroy {
  // @ViewChild(CdkPortalOutlet, {static: false}) portalOutlet: PortalOutlet;
  selectedPortal: Portal<unknown>;


  active$ = this.store.select(BudgetSelectors.active);

  destroy$ = new Subject<boolean>();

  open$ = this.store.select(selectOpen);
  constructor(private injector: Injector, private store: Store<State>) {}

  ngOnInit(): void {
    // this.store.pipe(select(selectRef), takeUntil(this.destroy$)).subscribe(ref => {
    //   this.portalOutlet.detach();
    //   this.portalOutlet.attach()
    // })
  }

  onVisibleChange(visible: boolean) {
    if (!visible) {
      this.store.dispatch(ModalActions.close());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
