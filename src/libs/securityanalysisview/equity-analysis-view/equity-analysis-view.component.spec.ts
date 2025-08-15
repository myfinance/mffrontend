import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityAnalysisViewComponent } from './equity-analysis-view.component';

describe('EquityAnalysisViewComponent', () => {
  let component: EquityAnalysisViewComponent;
  let fixture: ComponentFixture<EquityAnalysisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityAnalysisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquityAnalysisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
