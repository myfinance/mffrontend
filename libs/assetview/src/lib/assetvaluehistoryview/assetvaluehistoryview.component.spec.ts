import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetValueHistoryViewComponent } from './assetvaluehistoryviewcomponent';

describe('InstrumentvaluehistoryComponent', () => {
  let component: AssetValueHistoryViewComponent;
  let fixture: ComponentFixture<AssetValueHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetValueHistoryViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetValueHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
