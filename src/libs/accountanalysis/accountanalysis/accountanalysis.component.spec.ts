import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountanalysisComponent } from './accountanalysis.component';

describe('AccountanalysisComponent', () => {
  let component: AccountanalysisComponent;
  let fixture: ComponentFixture<AccountanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountanalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
