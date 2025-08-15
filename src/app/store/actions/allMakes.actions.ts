import { createAction, props } from '@ngrx/store';
import {
  IAllMakes,
  IModelForMake,
  IVehiclesType,
} from '../../../core/interfaces/interface';

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

// Vehicle Types and Models

export const LoadmakesTypesAndModel = createAction(
  '[GET MODEL] Load Makes Type And Model available',
  props<{ id: number }>()
);

export const makesTypesAndModelSuccess = createAction(
  '[GET MODEL] Load Makes Type And Model available Success',
  props<{ dataType: IVehiclesType; dataModels: IModelForMake }>()
);

export const clearCurrentVehicle = createAction(
  '[CLEAR VEHICLE] clear current vehicle name'
);
