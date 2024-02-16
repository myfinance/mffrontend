import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionviewComponent } from '../transactionview/transactionview.component';
import { TransactionService } from '../transaction.service';
import { TransactioninputformComponent } from '../transactioninputform/transactioninputform.component';

@Component({
  selector: 'mffrontend-transactioneditor',
  standalone: true,
  imports: [CommonModule, TransactionviewComponent, TransactioninputformComponent],
  providers: [
    TransactionService
  ],
  templateUrl: './transactioneditor.component.html',
  styleUrls: ['./transactioneditor.component.css'],
})
export class TransactioneditorComponent {}
