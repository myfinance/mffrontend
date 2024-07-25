import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantcontrollerComponent } from './tenantcontroller.component';

describe('TenantcontrollerComponent', () => {
  let component: TenantcontrollerComponent;
  let fixture: ComponentFixture<TenantcontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantcontrollerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
