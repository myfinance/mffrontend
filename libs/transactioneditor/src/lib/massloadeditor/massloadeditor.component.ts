import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TableModule } from 'primeng/table';
import { Instrument, InstrumentTypeEnum } from 'libs/shared/data-access-mfdata/src/lib/model/instrument';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'mffrontend-massloadeditor',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, InputSwitchModule, ButtonModule],
  templateUrl: './massloadeditor.component.html',
  styleUrl: './massloadeditor.component.scss',
})
export class MassloadeditorComponent {

  content: string[][] = [];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  selectedGiro: Instrument | undefined = undefined;

  constructor(private transactionService: TransactionService) {
    this.transactionService.newFileSelectedSubject.subscribe({
      next:
        () => {
          this.loadData();
        },
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })

    this.transactionService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.transactionService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();
  }

  loadData(){
    this.content=this.transactionService.getMassloadContent();
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
      }
    )
  }

  save() {
    this.transactionService.saveTransactions(this.content,this.selectedGiro);
  }

}
