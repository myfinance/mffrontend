import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentcontrollerComponent } from './instrumentcontroller.component';

describe('InstrumentcontrollerComponent', () => {
  let component: InstrumentcontrollerComponent;
  let fixture: ComponentFixture<InstrumentcontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentcontrollerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
