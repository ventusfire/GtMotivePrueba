import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  selectFilteredMakes,
  selectMakeLoading,
} from '../../app/store/selectors/makes.selectors';
import { IResult } from '../../core/interfaces/interface';

import * as MakesActions from '../../app/store/actions/allMakes.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ScrollingModule,
    MatListModule,
    MatAutocomplete,
    MatOption,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  router = inject(Router);

  makes$ = this.store.select(selectFilteredMakes);
  loading$ = this.store.select(selectMakeLoading);

  myControl = new FormControl<string | IResult>('');
  filteredOptions$!: Observable<IResult[]>;
  filteredMakes$!: Observable<IResult[]>;

  ngOnInit() {
    this.load();
    this.filteredMakes$ = combineLatest([
      this.makes$,
      this.myControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([makes, value]) => {
        const filterValue =
          typeof value === 'string'
            ? value.toLowerCase()
            : value?.Make_Name?.toLowerCase() ?? '';
        return makes.filter((make) =>
          make.Make_Name.toLocaleLowerCase().startsWith(filterValue)
        );
      })
    );
    this.filteredOptions$ = this.filteredMakes$.pipe(
      map((makes) => makes.slice(0, 10))
    );
  }

  load(): void {
    this.store.dispatch(MakesActions.LoadAllMakes());
  }

  search(val: Event | string): void {
    let filterValue: string;
    if (typeof val === 'string') {
      filterValue = val;
    } else {
      const input = val.target as HTMLInputElement;
      filterValue = input.value;
    }

    this.store.dispatch(MakesActions.makesFilter({ filter: filterValue }));
  }

  displayFn(user: IResult): string {
    return user.Make_Name ?? '';
  }

  typesAndModels(item: IResult): void {
    this.store.dispatch(
      MakesActions.LoadmakesTypesAndModel({ id: item.Make_ID })
    );
  }
}
