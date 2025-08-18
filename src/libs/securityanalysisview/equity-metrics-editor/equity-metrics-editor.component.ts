import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { Instrument } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equity-metrics-editor',
  standalone: true,
  imports: [CommonModule, Button, CalendarModule, ReactiveFormsModule, SidebarModule, InputNumberModule],
  templateUrl: './equity-metrics-editor.component.html',
  styleUrl: './equity-metrics-editor.component.scss'
})
export class EquityMetricsEditorComponent {
  sidebarVisible = false;
  currencies: Instrument[] = [];
  private securityMetrics: SecurityMetrics | undefined;
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
    })

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

  save() {
    if (this.securityMetrics!=undefined && this.form.value.fiscalEndDate != null && this.form.value.currency != null) {
      let metrics = this.securityMetrics;
      metrics.fiscalEndDate = this.form.value.fiscalEndDate;
      metrics.currencyKey = this.form.value.currency?.businesskey;
      if( this.form.value.expectedCashflowGrowth != null) metrics.expectedCashflowGrowth = this.form.value.expectedCashflowGrowth;
      if( this.form.value.avgMarktcapFreeCashflowRatio != null) metrics.avgMarktcapFreeCashflowRatio = this.form.value.avgMarktcapFreeCashflowRatio;
      if( this.form.value.sharesOutstanding != null) metrics.sharesOutstanding = this.form.value.sharesOutstanding;
      if( this.form.value.revenue != null) metrics.revenue = this.form.value.revenue;
      if( this.form.value.capitalExpenditures != null) metrics.capitalExpenditures = this.form.value.capitalExpenditures;
      if( this.form.value.operatingCashflow != null) metrics.operatingCashflow = this.form.value.operatingCashflow;
      if( this.form.value.netIncome != null) metrics.netIncome = this.form.value.netIncome;
      this.service.saveSecurityMetrics(metrics);
    }
  }
}
