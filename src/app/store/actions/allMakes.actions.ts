import { createAction, props } from '@ngrx/store';
import { IAllMakes } from '../../../core/interfaces/interface';

export const LoadAllMakes = createAction('[GET API] Load AllMakes');

export const LoadAllMakesSuccess = createAction(
  '[GET API] Load AllMakes Success',
  props<{ data: IAllMakes }>()
);

export const getAllError = createAction(
  '[GET API] Load AllMakes Error',
  props<{ error: any }>()
);

export const makesFilter = createAction(
  '[FILTER] Makes Filter',
  props<{ filter: string }>()
);
