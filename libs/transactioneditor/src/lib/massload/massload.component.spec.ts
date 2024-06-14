import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MassloadComponent } from './massload.component';

describe('MassloadComponent', () => {
  let component: MassloadComponent;
  let fixture: ComponentFixture<MassloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassloadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
