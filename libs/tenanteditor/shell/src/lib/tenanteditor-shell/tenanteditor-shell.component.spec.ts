import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenanteditorShellComponent } from './tenanteditor-shell.component';

describe('TenanteditorShellComponent', () => {
  let component: TenanteditorShellComponent;
  let fixture: ComponentFixture<TenanteditorShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenanteditorShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenanteditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
