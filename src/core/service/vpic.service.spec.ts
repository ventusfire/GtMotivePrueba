import { TestBed } from '@angular/core/testing';

import { VpicService } from './vpic.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';

describe('VpicService', () => {
  let service: VpicService;
  let httpMock: HttpTestingController;
  let Api = environment.API;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VpicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoild be return all vehicles makes', () => {
    const expectedResponse = {
      Count: 11920,
      Message: 'Response returned successfully',
      SearchCriteria: null,
      Results: [
        {
          Make_ID: 12858,
          Make_Name: '#1 ALPINE CUSTOMS',
        },
        {
          Make_ID: 4877,
          Make_Name: '1/OFF KUSTOMS, LLC',
        },
        {
          Make_ID: 11257,
          Make_Name: '102 IRONWORKS, INC.',
        },
      ],
    };

    const response = {
      Count: 11920,
      Message: 'Response returned successfully',
      SearchCriteria: null,
      Results: [
        {
          Make_ID: 12858,
          Make_Name: '#1 ALPINE CUSTOMS',
        },
        {
          Make_ID: 4877,
          Make_Name: '1/OFF KUSTOMS, LLC',
        },
        {
          Make_ID: 11257,
          Make_Name: '102 IRONWORKS, INC.',
        },
      ],
    };

    service.getAllMakes().subscribe((res) => {
      expect(res).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne(`${Api}getallmakes?format=json`);
    req.flush(response);
  });
});
