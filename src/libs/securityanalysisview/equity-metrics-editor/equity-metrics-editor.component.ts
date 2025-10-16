import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { AdditionalPropertiesEnum, Instrument } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityAnalysisViewService, tableRowTuple } from '../securityanalysisview.service';
import { SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-equity-metrics-editor',
  standalone: true,
  imports: [CommonModule, Button, CalendarModule, ReactiveFormsModule, SidebarModule, InputNumberModule,TableModule,DividerModule],
  templateUrl: './equity-metrics-editor.component.html',
  styleUrl: './equity-metrics-editor.component.scss'
})
export class EquityMetricsEditorComponent {
  sidebarVisible = false;
  currencies: Instrument[] = [];
  private securityMetrics: SecurityMetrics | undefined;
  histFCFs: tableRowTuple[]= [];
  selectedHistFCF?: tableRowTuple;

  form = new FormGroup({
    fiscalEndDate: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), {
      nonNullable: true,
      validators: Validators.required
    }),
    currency: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    expectedCashflowGrowth: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    avgMarktcapFreeCashflowRatio: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    sharesOutstanding: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    revenue: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    capitalExpenditures: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    operatingCashflow: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    netIncome: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    FCFYear: new FormControl<number>(2020, {
      nonNullable: false
    }),
    FCFhistory: new FormControl<number>(0.0, {
      nonNullable: false
    }),

  });

  constructor(private service: SecurityAnalysisViewService) {
    this.service.instrumentEventSubject.subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.service.selectInstrumentEventSubject.subscribe(
      () => {
        this.setNewSelectedInstrument();
      }
    )
    this.loadInstruments();
  }

  loadInstruments() {
    this.currencies = this.service.getCurrencies();
  }

  setNewSelectedInstrument(){
    const instrumentMetrics = this.service.getSelectedInstrument();
    if(instrumentMetrics!==undefined) {
      this.form.controls['fiscalEndDate'].setValue(instrumentMetrics.fiscalEndDate);
      this.form.controls['currency'].setValue(this.currencies.filter(instrument => instrument.businesskey ===instrumentMetrics.currencyKey)[0]);
      this.form.controls['expectedCashflowGrowth'].setValue(instrumentMetrics.expectedCashflowGrowth);
      this.form.controls['avgMarktcapFreeCashflowRatio'].setValue(instrumentMetrics.avgMarktcapFreeCashflowRatio);
      this.form.controls['sharesOutstanding'].setValue(instrumentMetrics.sharesOutstanding);
      this.form.controls['revenue'].setValue(instrumentMetrics.revenue);
      this.form.controls['capitalExpenditures'].setValue(instrumentMetrics.capitalExpenditures);
      this.form.controls['operatingCashflow'].setValue(instrumentMetrics.operatingCashflow);
      this.form.controls['netIncome'].setValue(instrumentMetrics.netIncome);
    } else {
      this.form.reset();
    }
    this.securityMetrics = instrumentMetrics;

  }

    addFCFHist() {
      const year = this.form.value.FCFYear;
      const value = this.form.value.FCFhistory;
      if(year && value!==undefined && value!==null) {
        const newTuple : tableRowTuple={
          year: year, 
          value: value
        }
        this.histFCFs.push(newTuple);
      }
      
    }
  
    removeFCFHist() {
      if(this.selectedHistFCF!==undefined) {
        const selectedYear = this.selectedHistFCF.year;
        this.histFCFs = this.histFCFs.filter(( obj ) => {
          return obj.year !== selectedYear;
        });
      }
    }

  save() {
    if (this.securityMetrics!=undefined && this.form.value.fiscalEndDate != null && this.form.value.currency != null) {
      let metrics = this.securityMetrics;
      metrics.fiscalEndDate = this.form.value.fiscalEndDate;
      if(this.form.value.currency!=null){
        const currencyCode = this.form.value.currency.additionalProperties.get(AdditionalPropertiesEnum.CURRENCYCODE);
        if (currencyCode !== undefined) {
          metrics.currencyKey = this.form.value.currency.businesskey;
          metrics.currencyCode = currencyCode;
        }
      }

      if( this.form.value.expectedCashflowGrowth != null) metrics.expectedCashflowGrowth = this.form.value.expectedCashflowGrowth;
      if( this.form.value.avgMarktcapFreeCashflowRatio != null) metrics.avgMarktcapFreeCashflowRatio = this.form.value.avgMarktcapFreeCashflowRatio;
      if( this.form.value.sharesOutstanding != null) metrics.sharesOutstanding = this.form.value.sharesOutstanding;
      if( this.form.value.revenue != null) metrics.revenue = this.form.value.revenue;
      if( this.form.value.capitalExpenditures != null) metrics.capitalExpenditures = this.form.value.capitalExpenditures;
      if( this.form.value.operatingCashflow != null) metrics.operatingCashflow = this.form.value.operatingCashflow;
      if( this.form.value.netIncome != null) metrics.netIncome = this.form.value.netIncome;
      metrics.historicalFreeCashflow = new Map(this.histFCFs.map(tuple => [tuple.year, tuple.value]));
      this.service.saveSecurityMetrics(metrics);
    }
  }
}
