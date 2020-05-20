import {Directive} from '@angular/core';
import {ShowHideDirective, ClassDirective, StyleDirective} from '@angular/flex-layout';

// tslint:disable: directive-selector
// tslint:disable: no-inputs-metadata-property

@Directive({selector: '[fxHide.mob]', inputs: ['fxHide.mob']})
export class MobShowHideDirective extends ShowHideDirective {
  protected inputs = ['fxHide.mob'];
}

@Directive({selector: '[ngClass.mob]', inputs: ['ngClass.mob']})
export class MobClassDirective extends ClassDirective {
  protected inputs = ['ngClass.mob'];
}

@Directive({selector: '[ngStyle.mob]', inputs: ['ngStyle.mob']})
export class MobStyleDirective extends StyleDirective {
  protected inputs = ['ngStyle.mob'];
}
