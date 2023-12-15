import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TransactioninputformComponent } from '../transactioninputform/transactioninputform.component';
import { TransactionupdateformComponent } from '../transactionupdateform/transactionupdateform.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'mffrontend-transactioncontroller',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TransactioninputformComponent, TransactionupdateformComponent],
  templateUrl: './transactioncontroller.component.html',
  styleUrls: ['./transactioncontroller.component.scss'],
})
export class TransactioncontrollerComponent {
  noTransactionSelected = true;

  constructor(private transactionService: TransactionService) {

    this.transactionService.newTransactionSelectedSubject.subscribe(
      () => {
        this.noTransactionSelected = false;
      }
    )
  }
}
