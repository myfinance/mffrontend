import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MassloadcontrollerComponent } from './massloadcontroller.component';

describe('MassloadcontrollerComponent', () => {
  let component: MassloadcontrollerComponent;
  let fixture: ComponentFixture<MassloadcontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassloadcontrollerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassloadcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
