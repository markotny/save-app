import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Store} from '@ngrx/store';
import {OidcFacade} from 'ng-oidc-client';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.scss']
})
export class HomeAppComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document,
    private store: Store,
    private oidcFacade: OidcFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.document.body.classList.add('background-light');
    this.document.body.classList.add('overflow-x-hidden');

    this.oidcFacade.loggedIn$.pipe(first()).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['app']);
      }
    });
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('background-light');
    this.document.body.classList.remove('overflow-x-hidden');
  }
}
