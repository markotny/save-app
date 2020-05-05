import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {BudgetState} from './budget.state';

@Injectable()
export class BudgetEffects {
  constructor(private actions$: Actions, private store: Store<BudgetState>) {}
}
