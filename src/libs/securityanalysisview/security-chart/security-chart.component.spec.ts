import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityChartComponent } from './security-chart.component';

describe('SecurityChartComponent', () => {
  let component: SecurityChartComponent;
  let fixture: ComponentFixture<SecurityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
