import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NavigationBase} from '@shell/navigation-base/navigation-base';
import {OidcFacade} from 'ng-oidc-client';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends NavigationBase implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(protected oidcFacade: OidcFacade) {
    super(oidcFacade);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }
}
