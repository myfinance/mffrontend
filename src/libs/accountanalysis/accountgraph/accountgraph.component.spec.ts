import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountgraphComponent } from './accountgraph.component';

describe('AccountgraphComponent', () => {
  let component: AccountgraphComponent;
  let fixture: ComponentFixture<AccountgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountgraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
