import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenanteditorFeatureTenantcontrollerComponent } from './tenanteditor-feature-tenantcontroller.component';

describe('TenanteditorFeatureTenantcontrollerComponent', () => {
  let component: TenanteditorFeatureTenantcontrollerComponent;
  let fixture: ComponentFixture<TenanteditorFeatureTenantcontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenanteditorFeatureTenantcontrollerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      TenanteditorFeatureTenantcontrollerComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
