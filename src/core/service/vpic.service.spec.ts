import { TestBed } from '@angular/core/testing';

import { VpicService } from './vpic.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VpicService', () => {
  let service: VpicService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VpicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
