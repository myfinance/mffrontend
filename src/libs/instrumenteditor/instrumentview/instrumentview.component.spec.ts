import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentviewComponent } from './instrumentview.component';

describe('InstrumentviewComponent', () => {
  let component: InstrumentviewComponent;
  let fixture: ComponentFixture<InstrumentviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
