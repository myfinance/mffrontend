import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumenteditorShellComponent } from './instrumenteditor-shell.component';

describe('InstrumenteditorShellComponent', () => {
  let component: InstrumenteditorShellComponent;
  let fixture: ComponentFixture<InstrumenteditorShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumenteditorShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumenteditorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
