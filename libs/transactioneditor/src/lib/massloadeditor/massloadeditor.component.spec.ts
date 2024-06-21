import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MassloadeditorComponent } from './massloadeditor.component';

describe('MassloadeditorComponent', () => {
  let component: MassloadeditorComponent;
  let fixture: ComponentFixture<MassloadeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassloadeditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassloadeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
