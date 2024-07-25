import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogstreamComponent } from './logstream.component';

describe('LogstreamComponent', () => {
  let component: LogstreamComponent;
  let fixture: ComponentFixture<LogstreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogstreamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
