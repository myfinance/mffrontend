import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactioninputformComponent } from './transactioninputform.component';

describe('TransactioninputformComponent', () => {
  let component: TransactioninputformComponent;
  let fixture: ComponentFixture<TransactioninputformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactioninputformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactioninputformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
