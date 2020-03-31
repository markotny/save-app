import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '@env/environment';
import {NavigationBase} from '@shell/navigation-base/navigation-base';
import {OidcFacade} from 'ng-oidc-client';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends NavigationBase implements OnInit {
  @Output() sidenavToggle = new EventEmitter();

  appName: string;

  constructor(protected oidcFacade: OidcFacade, protected store: Store) {
    super(oidcFacade, store);
  }

  ngOnInit() {
    super.ngOnInit();
    this.appName = environment.appName;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
