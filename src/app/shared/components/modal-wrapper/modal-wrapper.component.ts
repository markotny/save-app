import {Component, OnInit, Input, OnDestroy, AfterViewInit, ContentChildren, QueryList, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakPointRegistry} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgModel, NgForm} from '@angular/forms';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() type: 'edit' | 'remove';
  @ContentChildren(NgModel, {descendants: true}) public models: QueryList<NgModel>;
  @ViewChild(NgForm) public form: NgForm;

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
    this.breakpointObserver
      .observe(this.registry.findByAlias('xs').mediaQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({matches}) =>
        setTimeout(() => {
          this.config.styleClass = matches ? 'dialog dialog-fullscreen' : 'dialog';
        })
      );
  }

  ngAfterViewInit(): void {
    if (this.type !== 'remove') {
      this.models.toArray().forEach(model => {
        this.form.addControl(model);
      });

      if (this.config.data) {
        setTimeout(() => this.form.setValue(this.config.data.value));
      }
    }
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

  onSubmit(editForm: NgForm) {
    if (editForm.valid) {
      this.ref.close(editForm.value);
    }
  }
}
