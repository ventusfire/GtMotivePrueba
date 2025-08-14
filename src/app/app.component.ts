import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCurrentVehicleName,
  selectFilteredMakes,
} from './store/selectors/makes.selectors';

import * as MakesActions from './store/actions/allMakes.actions';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'GtMotivePrueba';

  toolbarTitle = 'Vehicle Information System';

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  currentVehicleName$ = this.store.select(selectCurrentVehicleName);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((res: NavigationEnd) => {
        const id = this.route.firstChild?.snapshot.paramMap.get('id');
        switch (res.urlAfterRedirects) {
          case '/home':
            this.toolbarTitle = 'Vehicle Information System';
            break;
          case `/information/${id}`:
            this.toolbarTitle = `Vehicle Details`;
            break;
          default:
            this.toolbarTitle;
        }
      });
  }

  backBrandsB(): void {
    this.router.navigate(['home']);
    this.store.dispatch(MakesActions.clearCurrentVehicle());
    this.store
      .select(selectCurrentVehicleName)
      .subscribe((res) => console.log(res));
  }
}
