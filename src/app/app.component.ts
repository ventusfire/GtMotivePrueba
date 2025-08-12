import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatOption,
} from '@angular/material/autocomplete';
import {
  selectAllMakesData,
  selectMakeLoading,
} from './store/selectors/makes.selectors';
import * as MakesActions from './store/actions/allMakes.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { IAllMakes, IResult } from '../core/interfaces/interface';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'GtMotivePrueba';

  private store = inject(Store);

  makes$ = this.store.select(selectAllMakesData);
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

  load() {
    this.store.dispatch(MakesActions.LoadAllMakes());
  }

  displayFn(user: IResult): string {
    return user && user.Make_Name ? user.Make_Name : '';
  }
}
