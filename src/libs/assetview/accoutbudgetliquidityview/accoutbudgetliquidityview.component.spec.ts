import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutbudgetliquidityviewComponent } from './accoutbudgetliquidityview.component';

describe('AccoutbudgetliquidityviewComponent', () => {
  let component: AccoutbudgetliquidityviewComponent;
  let fixture: ComponentFixture<AccoutbudgetliquidityviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccoutbudgetliquidityviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccoutbudgetliquidityviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
