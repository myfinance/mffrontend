import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountanalysiscontrollerComponent } from './accountanalysiscontroller.component';

describe('AccountanalysiscontrollerComponent', () => {
  let component: AccountanalysiscontrollerComponent;
  let fixture: ComponentFixture<AccountanalysiscontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountanalysiscontrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountanalysiscontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
