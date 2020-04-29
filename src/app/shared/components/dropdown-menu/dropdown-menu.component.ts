import {Component, OnInit, Input} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';
import {menuButtonAnimations} from './dropdown-menu.animations';

@Component({
  selector: 'app-dropdown-menu',
  animations: [menuButtonAnimations],
  template: `
    <div class="dropdown-menu-button" (click)="menu.toggle($event)">
      <a>{{ label }}</a>
      <i class="pi pi-chevron-right" [@menuToggle]="menuOpen"></i>
    </div>
    <p-menu #menu [popup]="true" [model]="menuItems" (onShow)="menuOpen = true" (onHide)="menuOpen = false"> </p-menu>
  `,
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @Input()
  menuItems: MenuItem[];

  @Input()
  label: string;

  menuOpen = false;

  constructor() {}

  ngOnInit(): void {}
}
