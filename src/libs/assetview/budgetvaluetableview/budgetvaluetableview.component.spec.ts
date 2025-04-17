import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetvaluetableviewComponent } from './budgetvaluetableview.component';

describe('BudgetvaluetableviewComponent', () => {
  let component: BudgetvaluetableviewComponent;
  let fixture: ComponentFixture<BudgetvaluetableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetvaluetableviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetvaluetableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
