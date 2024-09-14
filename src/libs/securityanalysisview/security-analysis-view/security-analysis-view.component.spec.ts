import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAnalysisViewComponent } from './security-analysis-view.component';

describe('SecurityAnalysisViewComponent', () => {
  let component: SecurityAnalysisViewComponent;
  let fixture: ComponentFixture<SecurityAnalysisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAnalysisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAnalysisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
