import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotOverviewComponent } from './depot-overview.component';

describe('DepotOverviewComponent', () => {
  let component: DepotOverviewComponent;
  let fixture: ComponentFixture<DepotOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepotOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
