import {Component, Input} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-dropdown-menu',
  animations: [
    trigger('menuToggle', [
      state(
        'true',
        style({
          transform: 'rotate(90deg)'
        })
      ),
      state(
        'false',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      transition('* => *', animate('0.1s ease-in-out'))
    ])
  ],
  template: `
    <div class="dropdown-menu-button" (click)="menu.toggle($event)">
      <a>{{ label }}</a>
      <a class="pi pi-chevron-right" [@menuToggle]="menuOpen"></a>
    </div>
    <p-menu #menu [popup]="true" [model]="menuItems" (onShow)="menuOpen = true" (onHide)="menuOpen = false"> </p-menu>
  `,
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() menuItems: MenuItem[];

  @Input() label: string;

  menuOpen = false;
}
