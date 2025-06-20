import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAllocationViewComponent } from './budget-allocation-view.component';

describe('BudgetAllocationViewComponent', () => {
  let component: BudgetAllocationViewComponent;
  let fixture: ComponentFixture<BudgetAllocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetAllocationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAllocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
