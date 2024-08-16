import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactionviewComponent } from './recurrenttransactionview.component';

describe('RecurrenttransactionviewComponent', () => {
  let component: RecurrenttransactionviewComponent;
  let fixture: ComponentFixture<RecurrenttransactionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurrenttransactionviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurrenttransactionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
