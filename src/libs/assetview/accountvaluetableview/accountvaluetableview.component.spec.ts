import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountvaluetableviewComponent } from './accountvaluetableview.component';

describe('AccountvaluetableviewComponent', () => {
  let component: AccountvaluetableviewComponent;
  let fixture: ComponentFixture<AccountvaluetableviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountvaluetableviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountvaluetableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
