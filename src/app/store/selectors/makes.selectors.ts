import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAllMakesState } from '../reducer/AllMakes.reducer';

export const selectMakesState = createFeatureSelector<IAllMakesState>('makes');

export const selectAllMakesData = createSelector(
  selectMakesState,
  (state) => state.data?.Results ?? []
);

export const selectMakeLoading = createSelector(
  selectMakesState,
  (state) => state.loading
);

export const selectMakeError = createSelector(
  selectMakesState,
  (state) => state.error
);
