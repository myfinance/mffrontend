import { TestBed } from '@angular/core/testing';

import { MfconfigService } from './mfconfig.service';

describe('MfconfigService', () => {
  let service: MfconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
