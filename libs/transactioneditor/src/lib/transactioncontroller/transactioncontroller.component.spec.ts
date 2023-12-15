import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactioncontrollerComponent } from './transactioncontroller.component';

describe('TransactioncontrollerComponent', () => {
  let component: TransactioncontrollerComponent;
  let fixture: ComponentFixture<TransactioncontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactioncontrollerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactioncontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
