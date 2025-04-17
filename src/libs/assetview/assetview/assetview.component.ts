import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewcontrollerComponent } from '../assetviewcontroller/assetviewcontroller.component';
import { InstrumentvaluedetailviewComponent } from '../instrumentvaluedetailview/instrumentvaluedetailview.component';
import { AssetValueHistoryViewComponent } from '../assetvaluehistoryview/assetvaluehistoryviewcomponent';
import { AssetviewService } from '../assetview.service';
import { AccountvaluetableviewComponent } from '../accountvaluetableview/accountvaluetableview.component';
import { BudgetvaluetableviewComponent } from '../budgetvaluetableview/budgetvaluetableview.component';
import { AccoutbudgetliquidityviewComponent } from '../accoutbudgetliquidityview/accoutbudgetliquidityview.component';

@Component({
  selector: 'mffrontend-assetview',
  standalone: true,
  imports: [CommonModule, AssetviewcontrollerComponent, AccoutbudgetliquidityviewComponent, AccountvaluetableviewComponent, BudgetvaluetableviewComponent,InstrumentvaluedetailviewComponent,AssetValueHistoryViewComponent],
  providers: [
    AssetviewService
  ],
  templateUrl: './assetview.component.html',
  styleUrls: ['./assetview.component.css'],
})
export class AssetviewComponent {}
