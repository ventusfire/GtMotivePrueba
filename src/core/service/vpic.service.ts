import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllMakes } from '../interfaces/interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VpicService {
  private readonly API_URL = environment.API;
  private readonly http = inject(HttpClient);

  getAllMakes(): Observable<IAllMakes> {
    return this.http.get<IAllMakes>(`${this.API_URL}getallmakes`, {
      params: { format: 'json' },
    });
  }

  getMakesFilter(name: string): Observable<IAllMakes> {
    return this.http.get<IAllMakes>(
      `${this.API_URL}GetVehicleTypesForMake/${name}`,
      {
        params: { format: 'json' },
      }
    );
  }
}
