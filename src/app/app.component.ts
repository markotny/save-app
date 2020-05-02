import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectTheme} from '@core/core.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme$: Observable<string>;
  constructor(private store: Store, private router: Router) {
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
  }
}
