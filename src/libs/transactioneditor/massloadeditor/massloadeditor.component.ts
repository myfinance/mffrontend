import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { Transaction, TransactionTypeEnum } from '../../shared/data-access-mfdata/model/transaction';
import { TypeConverter } from '../../shared/data-access-mfdata/typeConverter';
import { CsvRow } from '../../shared/data-access-mfdata/csvimporter';

@Component({
  selector: 'mffrontend-massloadeditor',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, InputSwitchModule, ButtonModule,ReactiveFormsModule, CalendarModule,InputNumberModule],
  templateUrl: './massloadeditor.component.html',
  styleUrl: './massloadeditor.component.scss',
})
export class MassloadeditorComponent {

  content: CsvRow[] = [];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];

  dynamicForm: FormGroup;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      rows: this.fb.array([])
    });

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

  get rows(): FormArray {
    if(this.dynamicForm ===undefined || this.dynamicForm ===null){
      return this.fb.array([])
    }
    return this.dynamicForm.get('rows') as FormArray;
  }

  loadData(){
    this.content=this.transactionService.getMassloadContent();
    this.initForm();
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO && instrument.active).sort((a, b) => a.description.localeCompare(b.description));
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET && instrument.active).sort((a, b) => a.description.localeCompare(b.description));
      }
    )
  }

  onSubmit(): void {
    if (this.dynamicForm.valid && this.transactionService.getSelectedGiro4MassUpload()!=undefined) {
      const giro =this.transactionService.getSelectedGiro4MassUpload();
      let checkedGiro: Instrument;
      if (giro!=undefined){
        checkedGiro = giro;
      } else {return;}
      
      console.log(this.dynamicForm.value);
      const result: Transaction[] = [];
      this.rows.controls.forEach(element => {
        if(!element.get('ignore')?.value && element.get('budget')!=undefined){
          const transactionDate = element.get('transactiondate')?.value;
          const value = element.get('value')?.value;
          let transactionType = TransactionTypeEnum.EXPENSE
          if(value>0){
            transactionType = TransactionTypeEnum.INCOME
          }
          const transaction = this.transactionService.createTransaction(transactionType, element.get('description')?.value, transactionDate, value, checkedGiro.businesskey, element.get('budget')?.value.businesskey, 
            "", "", "", "", 0, "", undefined );
          result.push(transaction);
        }
      });
      this.transactionService.saveTransactions(result);
    } else {
      console.log('Form is invalid');
    }
  }

  private initForm(): void {
    this.content.forEach(row => {
      const formGroup = this.fb.group({
        description: [row.description, Validators.required],
        transactiondate: [row.transactionDate, Validators.required],
        value: [row.value, Validators.required],
        budget: [null],
        ignore: [row.ignore],
      });
      this.rows.push(formGroup);
    });
  }


}
