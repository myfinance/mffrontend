import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewService } from '../assetview.service';

@Component({
  selector: 'mffrontend-instrumentvaluehistory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assetvaluehistoryview.component.html',
  styleUrls: ['./assetvaluehistoryview.component.scss'],
})
export class AssetValueHistoryViewComponent {
  
  constructor(private service:AssetviewService) {

  }

}
