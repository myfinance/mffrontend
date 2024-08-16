import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactioninputformComponent } from './recurrenttransactioninputform.component';

describe('RecurrenttransactioninputformComponent', () => {
  let component: RecurrenttransactioninputformComponent;
  let fixture: ComponentFixture<RecurrenttransactioninputformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurrenttransactioninputformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurrenttransactioninputformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
