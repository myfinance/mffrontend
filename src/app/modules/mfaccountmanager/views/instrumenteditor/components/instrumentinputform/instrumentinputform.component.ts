import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import InstrumentTypeEnum = Instrument.InstrumentTypeEnum;
import {InstrumentService} from '../../services/instrument.service';
import {Instrument} from '../../../../../myfinance-tsclient-generated';
import * as moment from 'moment';

@Component({
  selector: 'app-instrumentinputform',
  templateUrl: './instrumentinputform.component.html',
  styleUrls: ['./instrumentinputform.component.scss']
})
export class InstrumentinputformComponent implements OnInit {
  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.GIRO, InstrumentTypeEnum.BUDGET, InstrumentTypeEnum.REALESTATE, InstrumentTypeEnum.CURRENCY];
  budgetGroups: Instrument[] = [];
  budgets: Instrument[] = [];
  instrumentForm: FormGroup;
  valcaldata: FormArray;

  constructor(private formBuilder: FormBuilder, private instrumentservice: InstrumentService) { }

  ngOnInit() {
      this.instrumentForm = this.formBuilder.group({
        description: ['', Validators.required],
        instrumentType: [InstrumentTypeEnum.GIRO, Validators.required],
        budgetGroup: [null, [Validators.required, this.isBudgetGroupNecessary.bind(this)]],
        budget: [null, [Validators.required, this.isValueBudgetNecessary.bind(this)]],
        currencycode: ['', [Validators.required, this.isCurrencyCodeNecessary.bind(this)]],
        valcaldata: this.formBuilder.array([this.createItem()])
      });

    if (this.instrumentservice.getIsInit()) {
      this.loadData();
    }
    this.instrumentservice.instrumentSubject.subscribe(
      () => {
        this.loadData();
      }
    )
  }

  loadData(): void {
    this.budgetGroups = this.instrumentservice.getBudgetGroups();

    if (this.budgetGroups.length > 0) {
      this.instrumentForm.controls['budgetGroup'].setValue(this.budgetGroups[0], {onlySelf: true});
    }

    this.budgets = this.instrumentservice.getBudgets();

    if (this.budgets.length > 0) {
      this.instrumentForm.controls['budget'].setValue(this.budgets[0], {onlySelf: true});
    }

  }

  onSubmit() {
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.GIRO) {
      this.instrumentservice.saveGiro(this.instrumentForm.value.description)
    } else if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.BUDGET) {
      this.instrumentservice.saveBudget(this.instrumentForm.value.description, this.instrumentForm.value.budgetGroup.instrumentid)
    } else if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.REALESTATE) {
      let yieldgoals: string[] = [];
      let profits: string[] = [];
      this.instrumentForm.get('valcaldata')['controls'].forEach(element => {
        let valdate = moment(element.value.valDate).format('YYYY-MM-DD');
        yieldgoals.push(element.value.yieldgoal + "," + valdate);
        profits.push(element.value.profit + "," + valdate);
      });
      this.instrumentservice.saveRealEstate(this.instrumentForm.value.description, this.instrumentForm.value.budget.instrumentid, yieldgoals, profits);
    } else if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY) {
      this.instrumentservice.saveCurrency(this.instrumentForm.value.description, this.instrumentForm.value.currencycode)
    }
  }

  isBudgetGroupNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.BUDGET && this.instrumentForm.value.budgetGroup == null) {
      return {'BudgetGroup is necessary': true};
    } else { return null; }
  }

  isValueBudgetNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.REALESTATE && this.instrumentForm.value.budget == null) {
      return {'ValueBudget is necessary': true};
    } else { return null; }
  }

  isCurrencyCodeNecessary(control: FormControl): {[s: string]: boolean} {
    if (this.instrumentForm == null) { return null; }
    if (this.instrumentForm.value == null) { return null; }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY && this.instrumentForm.value.currencycode == null) {
      return {'CurrencyCode is necessary': true};
    } else { return null; }
  }

  addValueCalculationData() {
    this.valcaldata = this.instrumentForm.get('valcaldata') as FormArray;
    this.valcaldata.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      valDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      yieldgoal: 0.0,
      profit: 0.0
    });
  }
}
