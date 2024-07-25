import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentvaluedetailviewComponent } from './instrumentvaluedetailview.component';

describe('InstrumentvaluedetailviewComponent', () => {
  let component: InstrumentvaluedetailviewComponent;
  let fixture: ComponentFixture<InstrumentvaluedetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentvaluedetailviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentvaluedetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
