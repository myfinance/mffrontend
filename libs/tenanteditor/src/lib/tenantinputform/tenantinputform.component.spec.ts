import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantinputformComponent } from './tenantinputform.component';

describe('TenantinputformComponent', () => {
  let component: TenantinputformComponent;
  let fixture: ComponentFixture<TenantinputformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantinputformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantinputformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
