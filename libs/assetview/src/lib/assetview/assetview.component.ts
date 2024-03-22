import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewcontrollerComponent } from '../assetviewcontroller/assetviewcontroller.component';
import { AccountvalueviewComponent } from '../accountvalueview/accountvalueview.component';
import { AccountvaluechangeviewComponent } from '../accountvaluechangeview/accountvaluechangeview.component';
import { BudgetvalueviewComponent } from '../budgetvalueview/budgetvalueview.component';
import { BudgetvaluechangeviewComponent } from '../budgetvaluechangeview/budgetvaluechangeview.component';
import { InstrumentvaluedetailviewComponent } from '../instrumentvaluedetailview/instrumentvaluedetailview.component';
import { InstrumentvaluehistoryComponent } from '../instrumentvaluehistory/instrumentvaluehistory.component';
import { AssetviewService } from '../assetview.service';

@Component({
  selector: 'mffrontend-assetview',
  standalone: true,
  imports: [CommonModule, AssetviewcontrollerComponent, AccountvalueviewComponent,AccountvaluechangeviewComponent,BudgetvalueviewComponent,BudgetvaluechangeviewComponent,InstrumentvaluedetailviewComponent,InstrumentvaluehistoryComponent],
  providers: [
    AssetviewService
  ],
  templateUrl: './assetview.component.html',
  styleUrls: ['./assetview.component.css'],
})
export class AssetviewComponent {}
