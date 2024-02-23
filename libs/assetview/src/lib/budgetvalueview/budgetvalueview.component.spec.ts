import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetvalueviewComponent } from './budgetvalueview.component';

describe('BudgetvalueviewComponent', () => {
  let component: BudgetvalueviewComponent;
  let fixture: ComponentFixture<BudgetvalueviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetvalueviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetvalueviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
