import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAnalysisViewControllerComponent } from './portfolio-analysis-view-controller.component';

describe('PortfolioAnalysisViewControllerComponent', () => {
  let component: PortfolioAnalysisViewControllerComponent;
  let fixture: ComponentFixture<PortfolioAnalysisViewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAnalysisViewControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAnalysisViewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
