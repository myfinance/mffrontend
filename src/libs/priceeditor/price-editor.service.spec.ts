import { TestBed } from '@angular/core/testing';

import { PriceEditorService } from './price-editor.service';

describe('PriceEditorService', () => {
  let service: PriceEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
