import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentvaluehistoryComponent } from './instrumentvaluehistory.component';

describe('InstrumentvaluehistoryComponent', () => {
  let component: InstrumentvaluehistoryComponent;
  let fixture: ComponentFixture<InstrumentvaluehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentvaluehistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentvaluehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
