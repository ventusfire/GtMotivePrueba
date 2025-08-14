import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAllMakes,
  IModelForMake,
  IVehiclesType,
} from '../interfaces/interface';
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

  getVehicleTypesForMakeId(id: number): Observable<IVehiclesType> {
    return this.http.get<IVehiclesType>(
      `${this.API_URL}GetVehicleTypesForMakeId/${id}`,
      {
        params: { format: 'json' },
      }
    );
  }

  getModelsAvailableId(id: number): Observable<IModelForMake> {
    return this.http.get<IModelForMake>(
      `${this.API_URL}GetModelsForMakeId/${id}`,
      {
        params: { format: 'json' },
      }
    );
  }
}
