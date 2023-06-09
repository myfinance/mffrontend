import { TestBed } from '@angular/core/testing';

import { MfdataService } from './mfdata.service';

describe('MfdataService', () => {
  let service: MfdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
