import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesOverviewComponent } from './securities-overview.component';

describe('SecuritiesOverviewComponent', () => {
  let component: SecuritiesOverviewComponent;
  let fixture: ComponentFixture<SecuritiesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritiesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritiesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
