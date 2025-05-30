import { TestBed } from '@angular/core/testing';

import { AccountanalysisService } from './accountanalysis.service';

describe('AccountanalysisService', () => {
  let service: AccountanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
