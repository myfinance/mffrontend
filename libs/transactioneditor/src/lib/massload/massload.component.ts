import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionviewComponent } from '../transactionview/transactionview.component';
import { TransactionService } from '../transaction.service';
import { MassloadcontrollerComponent } from "../massloadcontroller/massloadcontroller.component";
import { MassloadeditorComponent } from "../massloadeditor/massloadeditor.component";

@Component({
    selector: 'mffrontend-massload',
    standalone: true,
    providers: [
        TransactionService
    ],
    templateUrl: './massload.component.html',
    styleUrl: './massload.component.scss',
    imports: [CommonModule, TransactionviewComponent, MassloadcontrollerComponent, MassloadeditorComponent]
})
export class MassloadComponent {}
