import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionupdateformComponent } from './transactionupdateform.component';

describe('TransactionupdateformComponent', () => {
  let component: TransactionupdateformComponent;
  let fixture: ComponentFixture<TransactionupdateformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionupdateformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionupdateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
