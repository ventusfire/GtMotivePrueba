import { TestBed } from '@angular/core/testing';

import { VpicService } from './vpic.service';
import { HttpClient } from '@angular/common/http';

describe('VpicService', () => {
  let service: VpicService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClient] });
    service = TestBed.inject(VpicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
