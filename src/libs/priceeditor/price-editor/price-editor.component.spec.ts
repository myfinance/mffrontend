import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEditorComponent } from './price-editor.component';

describe('PriceEditorComponent', () => {
  let component: PriceEditorComponent;
  let fixture: ComponentFixture<PriceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
