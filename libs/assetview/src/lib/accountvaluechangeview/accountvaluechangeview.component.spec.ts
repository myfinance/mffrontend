import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountvaluechangeviewComponent } from './accountvaluechangeview.component';

describe('AccountvaluechangeviewComponent', () => {
  let component: AccountvaluechangeviewComponent;
  let fixture: ComponentFixture<AccountvaluechangeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountvaluechangeviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountvaluechangeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
