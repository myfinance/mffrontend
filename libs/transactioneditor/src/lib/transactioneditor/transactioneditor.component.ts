import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionviewComponent } from '../transactionview/transactionview.component';
import { TransactioncontrollerComponent } from '../transactioncontroller/transactioncontroller.component';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'mffrontend-transactioneditor',
  standalone: true,
  imports: [CommonModule, TransactionviewComponent, TransactioncontrollerComponent],
  providers: [
    TransactionService
  ],
  templateUrl: './transactioneditor.component.html',
  styleUrls: ['./transactioneditor.component.css'],
})
export class TransactioneditorComponent {}
