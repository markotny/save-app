import {Unsaved} from '@shared/types';
import {EntityState} from '@ngrx/entity';
import {IncomeVM} from '@wydatex/models';

export type Income = IncomeVM & Unsaved;

export type IncomeState = EntityState<Income>;
