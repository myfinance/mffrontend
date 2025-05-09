import { TestBed } from '@angular/core/testing';

import { PortfolioAnalysisViewService } from './portfolio-analysis-view.service';

describe('PortfolioAnalysisViewService', () => {
  let service: PortfolioAnalysisViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioAnalysisViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
