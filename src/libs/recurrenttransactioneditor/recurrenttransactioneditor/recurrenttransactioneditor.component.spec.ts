import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactioneditorComponent } from './recurrenttransactioneditor.component';

describe('RecurrenttransactioneditorComponent', () => {
  let component: RecurrenttransactioneditorComponent;
  let fixture: ComponentFixture<RecurrenttransactioneditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurrenttransactioneditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurrenttransactioneditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
