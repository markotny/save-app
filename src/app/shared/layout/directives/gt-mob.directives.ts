import {Directive} from '@angular/core';
import {ShowHideDirective, ClassDirective, StyleDirective} from '@angular/flex-layout';

// tslint:disable: directive-selector
// tslint:disable: no-inputs-metadata-property

@Directive({selector: '[fxHide.gt-mob]', inputs: ['fxHide.gt-mob']})
export class GtMobShowHideDirective extends ShowHideDirective {
  protected inputs = ['fxHide.gt-mob'];
}

@Directive({selector: '[ngClass.gt-mob]', inputs: ['ngClass.gt-mob']})
export class GtMobClassDirective extends ClassDirective {
  protected inputs = ['ngClass.gt-mob'];
}

@Directive({selector: '[ngStyle.gt-mob]', inputs: ['ngStyle.gt-mob']})
export class GtMobStyleDirective extends StyleDirective {
  protected inputs = ['ngStyle.gt-mob'];
}
