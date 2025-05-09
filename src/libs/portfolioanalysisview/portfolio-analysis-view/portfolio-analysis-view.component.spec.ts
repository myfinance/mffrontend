import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAnalysisViewComponent } from './portfolio-analysis-view.component';

describe('PortfolioAnalysisViewComponent', () => {
  let component: PortfolioAnalysisViewComponent;
  let fixture: ComponentFixture<PortfolioAnalysisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAnalysisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAnalysisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
