import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionviewComponent } from '../transactionview/transactionview.component';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'mffrontend-massload',
  standalone: true,
  imports: [CommonModule, TransactionviewComponent],
  providers: [
    TransactionService
  ],
  templateUrl: './massload.component.html',
  styleUrl: './massload.component.scss',
})
export class MassloadComponent {}
