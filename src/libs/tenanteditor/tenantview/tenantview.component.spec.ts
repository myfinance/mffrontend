import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantviewComponent } from './tenantview.component';

describe('TenantviewComponent', () => {
  let component: TenantviewComponent;
  let fixture: ComponentFixture<TenantviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
