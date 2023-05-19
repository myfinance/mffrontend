import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicLayoutViewComponent } from './basic-layout-view.component';

describe('BasicLayoutViewComponent', () => {
  let component: BasicLayoutViewComponent;
  let fixture: ComponentFixture<BasicLayoutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLayoutViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicLayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
