import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcashflowanalysisComponent } from './accountcashflowanalysis.component';

describe('AccountcashflowanalysisComponent', () => {
  let component: AccountcashflowanalysisComponent;
  let fixture: ComponentFixture<AccountcashflowanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountcashflowanalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountcashflowanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
