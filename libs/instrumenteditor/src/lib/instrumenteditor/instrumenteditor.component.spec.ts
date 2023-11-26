import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumenteditorComponent } from './instrumenteditor.component';

describe('InstrumenteditorComponent', () => {
  let component: InstrumenteditorComponent;
  let fixture: ComponentFixture<InstrumenteditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumenteditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumenteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
