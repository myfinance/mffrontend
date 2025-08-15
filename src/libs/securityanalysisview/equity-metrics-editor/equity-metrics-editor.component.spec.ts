import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityMetricsEditorComponent } from './equity-metrics-editor.component';

describe('EquityMetricsEditorComponent', () => {
  let component: EquityMetricsEditorComponent;
  let fixture: ComponentFixture<EquityMetricsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityMetricsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquityMetricsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
