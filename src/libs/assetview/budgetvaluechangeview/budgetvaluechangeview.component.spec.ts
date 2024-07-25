import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetvaluechangeviewComponent } from './budgetvaluechangeview.component';

describe('BudgetvaluechangeviewComponent', () => {
  let component: BudgetvaluechangeviewComponent;
  let fixture: ComponentFixture<BudgetvaluechangeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetvaluechangeviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetvaluechangeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
