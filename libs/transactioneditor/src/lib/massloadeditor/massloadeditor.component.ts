import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TableModule } from 'primeng/table';
import { Instrument, InstrumentTypeEnum } from 'libs/shared/data-access-mfdata/src/lib/model/instrument';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'mffrontend-massloadeditor',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, InputSwitchModule, ButtonModule,ReactiveFormsModule, CalendarModule],
  templateUrl: './massloadeditor.component.html',
  styleUrl: './massloadeditor.component.scss',
})
export class MassloadeditorComponent {

  content: string[][] = [];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  selectedGiro: Instrument | undefined = undefined;

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
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
      }
    )
  }

  save() {
    this.transactionService.saveTransactions(this.content,this.selectedGiro);
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  private initForm(): void {
    this.content.forEach(row => {
      const formGroup = this.fb.group({
        description: [row[2], Validators.required],
        transactiondate: [row[1], Validators.required],
        value: [row[3], Validators.required],
        budget: [null, Validators.required],
        ignore: [false],
      });
      this.rows.push(formGroup);
    });
  }


}
