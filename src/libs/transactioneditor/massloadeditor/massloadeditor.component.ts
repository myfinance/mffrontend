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
import { CsvRow } from '../../shared/data-access-mfdata/csvimporter';
import { CheckboxModule } from 'primeng/checkbox';
import { Cashflow } from '../../shared/data-access-mfdata/model/cashflow';

@Component({
  selector: 'mffrontend-massloadeditor',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, InputSwitchModule, ButtonModule,ReactiveFormsModule, CalendarModule,InputNumberModule,CheckboxModule],
  templateUrl: './massloadeditor.component.html',
  styleUrl: './massloadeditor.component.scss',
})
export class MassloadeditorComponent {

  content: CsvRow[] = [];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];

  instrumentValue = 0.0;
  cashflows: Cashflow[] = [];
  selectedInstrumentDesc="NA";

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

    this.transactionService.selectedInstrumentEventSubject.subscribe(
      {
        next: () => {
          this.setInstrumentData();
        },
        error: (e) => console.error(e)
      }
    )

  }

  setInstrumentData(){

    const details = this.transactionService.getSelectedInstrumentDetails();
    if(details?.description!=undefined){
      this.selectedInstrumentDesc=details.description;
    }
    if (details !== undefined) {
      const selectedInstrumentFullDetails = details;
      const themap = new Map(Object.entries(details.additionalValues));
      let valueProperty = themap.get('valueDuedate');
      if (valueProperty !== undefined) {
        this.instrumentValue = valueProperty;
      }

      let rownumber = 0;
      this.cashflows = [
        ...details.incomeInPeriod.map(c => new Cashflow(c.description, c.transactiondate, c.instrumentBusinesskey, c.value)),
        ...details.expensesInPeriod.map(c => new Cashflow(c.description, c.transactiondate, c.instrumentBusinesskey, c.value))
      ];
    }
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
        if(!element.get('ignore')?.value && element.get('budgetOrGiro')!=undefined){
          const transactionDate = element.get('transactiondate')?.value;
          const value = element.get('value')?.value;
          const isTransaction = element.get('isTransfer')?.value;
          let transactionType = TransactionTypeEnum.EXPENSE;
          if(isTransaction){
            transactionType = TransactionTypeEnum.TRANSFER
          }
          else if(value>0){
            transactionType = TransactionTypeEnum.INCOME
          }
          if(isTransaction && value>0){
            const transaction = this.transactionService.createTransaction(transactionType, element.get('description')?.value, transactionDate, value, element.get('budgetOrGiro')?.value.businesskey, "", 
              "", checkedGiro.businesskey, "", "", 0, "", undefined );
            result.push(transaction);
          } else {
            const transaction = this.transactionService.createTransaction(transactionType, element.get('description')?.value, transactionDate, value, checkedGiro.businesskey, element.get('budgetOrGiro')?.value.businesskey, 
              "", element.get('budgetOrGiro')?.value.businesskey, "", "", 0, "", undefined );
            result.push(transaction);
          }
        }
      });
      this.transactionService.saveTransactions(result);
      this.dynamicForm = this.fb.group({
        rows: this.fb.array([])
      });
    } else {
      console.log('Form is invalid');
    }
  }

  private initForm(): void {
    this.dynamicForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.content.forEach(row => {
      const formGroup = this.fb.group({
        description: [row.description, Validators.required],
        transactiondate: [row.transactionDate, Validators.required],
        value: [row.value, Validators.required],
        budgetOrGiro: [this.matchBudget(row.categorie, row.subcategorie)],
        ignore: [row.ignore],
        isTransfer: [false]
      });
      this.rows.push(formGroup);
    });
  }

  private matchBudget(categorie: String, subcategorie: String): Instrument | null{
    const budgetList = this.budgets;
    if(categorie != null && categorie!=undefined){
      if(categorie=="Lebensmittel") {
        return budgetList.filter(b=>b.description=="Lebenserhaltungskosten")[0];
      }
      if(categorie=="Freizeit & Unterhaltung" || categorie=="Restaurant/ Café/ Bar") {
        return budgetList.filter(b=>b.description=="Urlaub und Party")[0];
      }
      if(categorie=="Shopping") {
        if(subcategorie=="Online-Shopping"|| subcategorie=="Bekleidung") {
          return budgetList.filter(b=>b.description=="Kleidung")[0];
        } 
        if(subcategorie=="Drogerie") {
          return budgetList.filter(b=>b.description=="Lebenserhaltungskosten")[0];
        } 
        return budgetList.filter(b=>b.description=="Möbel Technik sonstige Anschaffungen")[0];
      }
      if(categorie=="Wellness & Beauty") {
        return budgetList.filter(b=>b.description=="Frisör")[0];
      }
      if(categorie=="Mobilität") {
        if(subcategorie=="Tanken") {
          return budgetList.filter(b=>b.description=="Benzin")[0];
        } 
        return budgetList.filter(b=>b.description=="Möbel Technik sonstige Anschaffungen")[0];
      }
      if(categorie=="Gesundheit") {
        if(subcategorie=="Apotheke") {
          return budgetList.filter(b=>b.description=="Apotheke")[0];
        } 
        return budgetList.filter(b=>b.description=="PKV")[0];
      }
      if(categorie=="DSL & Mobilfunk") {
        return budgetList.filter(b=>b.description=="Telefon")[0];
      }
    }
    return null;
  }


}
