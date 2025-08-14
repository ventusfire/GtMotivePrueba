import { createReducer, on } from '@ngrx/store';
import { IAllMakes, IVehiclesType } from '../../../core/interfaces/interface';
import * as MakesAccion from '../actions/allMakes.actions';

export interface IAllMakesState {
  data: IAllMakes | null;
  dataType: IVehiclesType | null;
  filter: string;
  loading: boolean;
  error: any;
  id?: number;
}

export const inicialState: IAllMakesState = {
  data: null,
  dataType: null,
  filter: '',
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
  })),

  on(MakesAccion.makesFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  on(MakesAccion.LoadmakesTypesAndModel, (state, { id }) => ({
    ...state,
    id,
    loading: true,
  })),

  on(MakesAccion.makesTypesAndModelSuccess, (state, { dataType }) => ({
    ...state,
    dataType,
    loading: false,
  })),

  on(MakesAccion.clearCurrentVehicle, (state) => ({
    ...state,
    currentVehicleName: null,
  }))
);
