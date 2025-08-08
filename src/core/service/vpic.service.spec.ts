import { TestBed } from '@angular/core/testing';

import { VpicService } from './vpic.service';

describe('VpicService', () => {
  let service: VpicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VpicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
