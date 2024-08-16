import { TestBed } from '@angular/core/testing';

import { RecurrenttransactionService } from './recurrenttransaction.service';

describe('RecurrenttransactionService', () => {
  let service: RecurrenttransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurrenttransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
