import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {selectTheme} from '@core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
  }
}
