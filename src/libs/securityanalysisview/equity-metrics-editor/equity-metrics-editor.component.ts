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
  imports: [CommonModule, Button, CalendarModule, ReactiveFormsModule, SidebarModule, InputNumberModule, TableModule, DividerModule],
  templateUrl: './equity-metrics-editor.component.html',
  styleUrl: './equity-metrics-editor.component.scss'
})
export class EquityMetricsEditorComponent {
  sidebarVisible = false;
  currencies: Instrument[] = [];
  securityMetrics: SecurityMetrics | undefined;
  histFCFs: tableRowTuple[] = [];
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
    totalLiabilities: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    shortLongTermDebtTotal: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    totalCash: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    dilutedEPS5Y: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    dividendPerShare: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    FCFYear: new FormControl<number>(2020, {
      nonNullable: false
    }),
    FCFhistory: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    FCFGrowthY1: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY2: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY3: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY4: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY5: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY6: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY7: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY8: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY9: new FormControl<number>(1.0, {
      nonNullable: false
    }),
    FCFGrowthY10: new FormControl<number>(1.0, {
      nonNullable: false
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

  setNewSelectedInstrument() {
    const instrumentMetrics = this.service.getSelectedInstrument();
    if (instrumentMetrics !== undefined) {
      this.form.controls['fiscalEndDate'].setValue(instrumentMetrics.fiscalEndDate);
      this.form.controls['currency'].setValue(this.currencies.filter(instrument => instrument.businesskey === instrumentMetrics.currencyKey)[0]);
      this.form.controls['expectedCashflowGrowth'].setValue(instrumentMetrics.expectedCashflowGrowth);
      this.form.controls['avgMarktcapFreeCashflowRatio'].setValue(instrumentMetrics.avgMarktcapFreeCashflowRatio);
      this.form.controls['sharesOutstanding'].setValue(instrumentMetrics.sharesOutstanding);
      this.form.controls['revenue'].setValue(instrumentMetrics.revenue);
      this.form.controls['capitalExpenditures'].setValue(instrumentMetrics.capitalExpenditures);
      this.form.controls['operatingCashflow'].setValue(instrumentMetrics.operatingCashflow);
      this.form.controls['netIncome'].setValue(instrumentMetrics.netIncome);
      this.form.controls['totalLiabilities'].setValue(instrumentMetrics.totalLiabilities);
      this.form.controls['shortLongTermDebtTotal'].setValue(instrumentMetrics.shortLongTermDebtTotal);
      this.form.controls['totalCash'].setValue(instrumentMetrics.totalCash);
      this.form.controls['dilutedEPS5Y'].setValue(instrumentMetrics.dilutedEPS5Y);
      this.form.controls['dividendPerShare'].setValue(instrumentMetrics.dividendPerShare);
      this.histFCFs = Array.from(instrumentMetrics.historicalFreeCashflow.entries()).map(([year, value]) => ({ year, value }));
      let expectedFreeCashflowGrowthPerYear: tableRowTuple[] = [];
      expectedFreeCashflowGrowthPerYear = Array.from(instrumentMetrics.expectedFreeCashflowGrowthPerYear.entries()).map(([year, value]) => ({ year, value }));
      if (expectedFreeCashflowGrowthPerYear.length == 10) {
        this.form.controls['FCFGrowthY1'].setValue(expectedFreeCashflowGrowthPerYear[0].value);
        this.form.controls['FCFGrowthY2'].setValue(expectedFreeCashflowGrowthPerYear[1].value);
        this.form.controls['FCFGrowthY3'].setValue(expectedFreeCashflowGrowthPerYear[2].value);
        this.form.controls['FCFGrowthY4'].setValue(expectedFreeCashflowGrowthPerYear[3].value);
        this.form.controls['FCFGrowthY5'].setValue(expectedFreeCashflowGrowthPerYear[4].value);
        this.form.controls['FCFGrowthY6'].setValue(expectedFreeCashflowGrowthPerYear[5].value);
        this.form.controls['FCFGrowthY7'].setValue(expectedFreeCashflowGrowthPerYear[6].value);
        this.form.controls['FCFGrowthY8'].setValue(expectedFreeCashflowGrowthPerYear[7].value);
        this.form.controls['FCFGrowthY9'].setValue(expectedFreeCashflowGrowthPerYear[8].value);
        this.form.controls['FCFGrowthY10'].setValue(expectedFreeCashflowGrowthPerYear[9].value);
      }
    } else {
      this.form.reset();
    }
    this.securityMetrics = instrumentMetrics;

  }

  initExpectedFCFPerYear() {
    if (this.form.value.expectedCashflowGrowth != null) {
      const value = this.form.value.expectedCashflowGrowth;
      this.form.controls['FCFGrowthY1'].setValue(value);
      this.form.controls['FCFGrowthY2'].setValue(value);
      this.form.controls['FCFGrowthY3'].setValue(value);
      this.form.controls['FCFGrowthY4'].setValue(value);
      this.form.controls['FCFGrowthY5'].setValue(value);
      this.form.controls['FCFGrowthY6'].setValue(value);
      this.form.controls['FCFGrowthY7'].setValue(value);
      this.form.controls['FCFGrowthY8'].setValue(value);
      this.form.controls['FCFGrowthY9'].setValue(value);
      this.form.controls['FCFGrowthY10'].setValue(value);
    }
  }


  addFCFHist() {
    const year = this.form.value.FCFYear;
    const value = this.form.value.FCFhistory;
    if (year && value !== undefined && value !== null) {
      const newTuple: tableRowTuple = {
        year: year,
        value: value
      }
      this.histFCFs.push(newTuple);
    }

  }

  removeFCFHist() {
    if (this.selectedHistFCF !== undefined) {
      const selectedYear = this.selectedHistFCF.year;
      this.histFCFs = this.histFCFs.filter((obj) => {
        return obj.year !== selectedYear;
      });
    }
  }

  save() {
    if (this.securityMetrics != undefined && this.form.value.fiscalEndDate != null && this.form.value.currency != null) {
      let metrics = this.securityMetrics;
      metrics.fiscalEndDate = this.form.value.fiscalEndDate;
      if (this.form.value.currency != null) {
        const currencyCode = this.form.value.currency.additionalProperties.get(AdditionalPropertiesEnum.CURRENCYCODE);
        if (currencyCode !== undefined) {
          metrics.currencyKey = this.form.value.currency.businesskey;
          metrics.currencyCode = currencyCode;
        }
      }

      if (this.form.value.expectedCashflowGrowth != null) metrics.expectedCashflowGrowth = this.form.value.expectedCashflowGrowth;
      if (this.form.value.avgMarktcapFreeCashflowRatio != null) metrics.avgMarktcapFreeCashflowRatio = this.form.value.avgMarktcapFreeCashflowRatio;
      if (this.form.value.sharesOutstanding != null) metrics.sharesOutstanding = this.form.value.sharesOutstanding;
      if (this.form.value.revenue != null) metrics.revenue = this.form.value.revenue;
      if (this.form.value.capitalExpenditures != null) metrics.capitalExpenditures = this.form.value.capitalExpenditures;
      if (this.form.value.operatingCashflow != null) metrics.operatingCashflow = this.form.value.operatingCashflow;
      if (this.form.value.netIncome != null) metrics.netIncome = this.form.value.netIncome;
      if (this.form.value.totalLiabilities != null) metrics.totalLiabilities = this.form.value.totalLiabilities;
      if (this.form.value.shortLongTermDebtTotal != null) metrics.shortLongTermDebtTotal = this.form.value.shortLongTermDebtTotal;
      if (this.form.value.totalCash != null) metrics.totalCash = this.form.value.totalCash;
      if (this.form.value.dilutedEPS5Y != null) metrics.dilutedEPS5Y = this.form.value.dilutedEPS5Y;
      if (this.form.value.dividendPerShare != null) metrics.dividendPerShare = this.form.value.dividendPerShare;
      metrics.historicalFreeCashflow = new Map(this.histFCFs.map(tuple => [tuple.year, tuple.value]));
      metrics.expectedFreeCashflowGrowthPerYear = new Map<number, number>();
      if (this.form.value.FCFGrowthY1 != null) metrics.expectedFreeCashflowGrowthPerYear.set(1, this.form.value.FCFGrowthY1);
      if (this.form.value.FCFGrowthY2 != null) metrics.expectedFreeCashflowGrowthPerYear.set(2, this.form.value.FCFGrowthY2);
      if (this.form.value.FCFGrowthY3 != null) metrics.expectedFreeCashflowGrowthPerYear.set(3, this.form.value.FCFGrowthY3);
      if (this.form.value.FCFGrowthY4 != null) metrics.expectedFreeCashflowGrowthPerYear.set(4, this.form.value.FCFGrowthY4);
      if (this.form.value.FCFGrowthY5 != null) metrics.expectedFreeCashflowGrowthPerYear.set(5, this.form.value.FCFGrowthY5);
      if (this.form.value.FCFGrowthY6 != null) metrics.expectedFreeCashflowGrowthPerYear.set(6, this.form.value.FCFGrowthY6);
      if (this.form.value.FCFGrowthY7 != null) metrics.expectedFreeCashflowGrowthPerYear.set(7, this.form.value.FCFGrowthY7);
      if (this.form.value.FCFGrowthY8 != null) metrics.expectedFreeCashflowGrowthPerYear.set(8, this.form.value.FCFGrowthY8);
      if (this.form.value.FCFGrowthY9 != null) metrics.expectedFreeCashflowGrowthPerYear.set(9, this.form.value.FCFGrowthY9);
      if (this.form.value.FCFGrowthY10 != null) metrics.expectedFreeCashflowGrowthPerYear.set(10, this.form.value.FCFGrowthY10);
      this.service.saveSecurityMetrics(metrics);
    }
  }
}
