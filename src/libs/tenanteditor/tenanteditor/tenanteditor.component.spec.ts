import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenanteditorComponent } from './tenanteditor.component';

describe('TenanteditorComponent', () => {
  let component: TenanteditorComponent;
  let fixture: ComponentFixture<TenanteditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenanteditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenanteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
