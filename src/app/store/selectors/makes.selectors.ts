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

export const selectFilteredMakes = createSelector(selectMakesState, (state) => {
  if (!state.data) return [];
  if (!state.filter) return state.data.Results;
  return state.data.Results.filter((fil) =>
    fil.Make_Name.toLowerCase().startsWith(state.filter.toLowerCase())
  );
});

export const selectCurrentMakeId = createSelector(
  selectMakesState,
  (state) => state.id
);

// Vehicle Types

export const selectCurrentVehicleName = createSelector(
  selectCurrentMakeId,
  selectAllMakesData,
  (id, makes) => {
    if (!id) return null;
    const selected = makes.find((m) => m.Make_ID === id);
    return selected ? selected.Make_Name : null;
  }
);

export const selectVehicleTypes = createSelector(
  selectMakesState,
  (state) => state.dataType?.Results ?? []
);

// Models

export const selectModels = createSelector(
  selectMakesState,
  (state) => state.dataModels?.Results ?? []
);
