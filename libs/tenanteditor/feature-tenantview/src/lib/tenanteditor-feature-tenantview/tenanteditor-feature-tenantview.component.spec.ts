import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenanteditorFeatureTenantviewComponent } from './tenanteditor-feature-tenantview.component';

describe('TenanteditorFeatureTenantviewComponent', () => {
  let component: TenanteditorFeatureTenantviewComponent;
  let fixture: ComponentFixture<TenanteditorFeatureTenantviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenanteditorFeatureTenantviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenanteditorFeatureTenantviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
