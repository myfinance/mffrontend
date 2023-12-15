import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentinputformComponent } from './instrumentinputform.component';

describe('InstrumentinputformComponent', () => {
  let component: InstrumentinputformComponent;
  let fixture: ComponentFixture<InstrumentinputformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentinputformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentinputformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
