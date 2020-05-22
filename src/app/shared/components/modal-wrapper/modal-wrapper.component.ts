import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakPointRegistry} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, OnDestroy {
  @Input() type: 'edit' | 'remove';
  @Input() form: FormGroup;

  destroy$ = new Subject();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public breakpointObserver: BreakpointObserver,
    private registry: BreakPointRegistry
  ) {
    this.config.closable = false;
  }

  ngOnInit(): void {
    if (this.type !== 'remove' && this.config.data) {
      this.form.setValue(this.config.data.value);
    }

    this.breakpointObserver
      .observe(this.registry.findByAlias('xs').mediaQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({matches}) =>
        setTimeout(() => {
          this.config.styleClass = matches ? 'dialog dialog-fullscreen' : 'dialog';
        })
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  close() {
    this.ref.close();
  }

  confirm() {
    this.ref.close(true);
  }

  public save() {
    if (this.form.valid) {
      this.ref.close(this.form.value);
    }
  }
}
