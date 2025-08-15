import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentVehicleName,
  selectFilteredMakes,
  selectModels,
  selectVehicleTypes,
} from '../../app/store/selectors/makes.selectors';

import * as MakesActions from '../../app/store/actions/allMakes.actions';
import { AsyncPipe } from '@angular/common';
import { map, Observable, take } from 'rxjs';
import { IResultMFM, IResultVT } from '../../core/interfaces/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export default class InformationComponent {
  store = inject(Store);
  private route = inject(ActivatedRoute);

  vehicleTypes$: Observable<IResultVT[]> = new Observable();
  models$: Observable<IResultMFM[]> = new Observable();

  currentVehicleName$ = this.store.select(selectCurrentVehicleName);
  brandName: string = '';

  ngOnInit(): void {
    this.firstCall();
  }

  firstCall(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.vehicleTypes$ = this.store.select(selectVehicleTypes);
    this.models$ = this.store.select(selectModels);

    this.store
      .select(selectVehicleTypes)
      .pipe(take(1))
      .subscribe((res) => {
        if (!res || res.length === 0) {
          this.store.dispatch(MakesActions.LoadmakesTypesAndModel({ id: id }));
          this.store.dispatch(MakesActions.LoadAllMakes());
        }
      });
  }
}
