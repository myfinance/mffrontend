import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAnalysisControllerComponent } from './security-analysis-controller.component';

describe('SecurityAnalysisControllerComponent', () => {
  let component: SecurityAnalysisControllerComponent;
  let fixture: ComponentFixture<SecurityAnalysisControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAnalysisControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAnalysisControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
