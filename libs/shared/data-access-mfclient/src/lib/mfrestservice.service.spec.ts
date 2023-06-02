import { TestBed } from '@angular/core/testing';

import { MfrestserviceService } from './mfrestservice.service';

describe('MfrestserviceService', () => {
  let service: MfrestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfrestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
