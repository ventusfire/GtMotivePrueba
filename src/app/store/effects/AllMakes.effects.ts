import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VpicService } from '../../../core/service/vpic.service';
import * as MakesActions from '../actions/allMakes.actions';
import {
  catchError,
  debounceTime,
  filter,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AllMakesEffects {
  router = inject(Router);
  constructor(private actions$: Actions, private makesService: VpicService) {}

  loadAllMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.LoadAllMakes),
      mergeMap(() =>
        this.makesService.getAllMakes().pipe(
          map((data) => MakesActions.LoadAllMakesSuccess({ data })),
          catchError((error) => of(MakesActions.getAllError({ error })))
        )
      )
    )
  );

  searchVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.LoadmakesTypesAndModel),
      map((action) => action.id),
      mergeMap((id) =>
        forkJoin({
          dataType: this.makesService.getVehicleTypesForMakeId(id),
          dataModels: this.makesService.getModelsAvailableId(id),
        }).pipe(
          map(({ dataType, dataModels }) =>
            MakesActions.makesTypesAndModelSuccess({ dataType, dataModels })
          ),
          tap(() => this.router.navigate(['/information', id])),
          catchError((error) => of(MakesActions.getAllError({ error })))
        )
      )
    )
  );
}
