import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountvalueviewComponent } from './accountvalueview.component';

describe('AccountvalueviewComponent', () => {
  let component: AccountvalueviewComponent;
  let fixture: ComponentFixture<AccountvalueviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountvalueviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountvalueviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
