import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VpicService } from '../../../core/service/vpic.service';
import * as MakesActions from '../actions/allMakes.actions';
import { catchError, debounceTime, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class AllMakesEffects {
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

  searchMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.makesFilter),
      debounceTime(300),
      map((action) => action.filter),
      switchMap((name) =>
        this.makesService.getMakesFilter(name).pipe(
          map(
            (data) => MakesActions.LoadAllMakesSuccess({ data }),
            catchError((error) => of(MakesActions.getAllError({ error })))
          )
        )
      )
    )
  );
}
