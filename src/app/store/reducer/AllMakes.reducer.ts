import { createReducer, on } from '@ngrx/store';
import { IAllMakes } from '../../../core/interfaces/interface';
import * as MakesAccion from '../actions/allMakes.actions';

export interface IAllMakesState {
  data: IAllMakes | null;
  loading: boolean;
  error: any;
}

export const inicialState: IAllMakesState = {
  data: null,
  loading: false,
  error: null,
};

export const makesReducer = createReducer(
  inicialState,
  on(MakesAccion.LoadAllMakes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MakesAccion.LoadAllMakesSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),

  on(MakesAccion.getAllError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
