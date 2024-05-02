import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewService } from '../assetview.service';

@Component({
  selector: 'mffrontend-accountvaluechangeview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountvaluechangeview.component.html',
  styleUrls: ['./accountvaluechangeview.component.scss'],
})
export class AccountvaluechangeviewComponent {

  value = 0.0;


  constructor(private service:AssetviewService) {
    this.service.accValueEventSubject.subscribe(
      {
        next: () => {
          this.loadDetails();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.accValueEventSubject.subscribe(
      {
        next: () => {
          this.loadDetails();
        },
        error: (e) => console.error(e)
      }
    )
  }

  loadDetails(){
    this.value=this.service.getSelectedAccountValue();
  }
}
