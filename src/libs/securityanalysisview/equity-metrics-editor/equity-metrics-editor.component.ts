import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { AdditionalPropertiesEnum, Instrument } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityAnalysisViewService, tableRowTuple } from '../securityanalysisview.service';
import { SecurityLifecyclePhaseEnum, SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-equity-metrics-editor',
  standalone: true,
  imports: [CommonModule, Button, CalendarModule, ReactiveFormsModule, SidebarModule, InputNumberModule, TableModule, DividerModule, CheckboxModule, DropdownModule],
  templateUrl: './equity-metrics-editor.component.html',
  styleUrl: './equity-metrics-editor.component.scss'
})
export class EquityMetricsEditorComponent {
  sidebarVisible = false;
  currencies: Instrument[] = [];
  securityMetrics: SecurityMetrics | undefined;
  histFCFs: tableRowTuple[] = [];
  selectedHistFCF?: tableRowTuple;
  securityLifecyclePhaseEnumValues = Object.values(SecurityLifecyclePhaseEnum);
  scoreOptions = [
    'RED',
    'YELLOW',
    'GREEN'
  ];

  form = new FormGroup({
    fiscalEndDate: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), {
      nonNullable: true,
      validators: Validators.required
    }),
    currency: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    sector: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    expectedCashflowGrowth: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    avgMarktcapFreeCashflowRatio: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    expectedFreeCashflowOverride: new FormControl<number>(0, {
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
    eps: new FormControl<number>(0, {
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
    goodwill: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    ebitda: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    ebit: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    grossProfit: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    totalEquity: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    totalAssets: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    currentLiabilities: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    hasDividendsOrBuyBacks: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: Validators.required
    }),
    operatingIncome: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    operatingIncomeLastYear: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),      
    securityLifecyclePhaseOverride: new FormControl<SecurityLifecyclePhaseEnum>(SecurityLifecyclePhaseEnum.STARTUP, {
      nonNullable: true,
      validators: Validators.required
    }),
    forwardSales: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),  
    forwardFCF: new FormControl<number>(0, {
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
    }),
    metricScore: new FormControl<string>('RED', {
      nonNullable: true,
      validators: Validators.required
    }),
    moatScore: new FormControl<string>('RED', {
      nonNullable: true,
      validators: Validators.required
    }),
    riskScore: new FormControl<string>('RED', {
      nonNullable: true,
      validators: Validators.required
    }),
    growthScore: new FormControl<string>('RED', {
      nonNullable: true,
      validators: Validators.required
    }),

    comment: new FormControl<string>('', {
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

  setNewSelectedInstrument() {
    const instrumentMetrics = this.service.getSelectedInstrument();
    if (instrumentMetrics !== undefined) {
      this.form.controls['fiscalEndDate'].setValue(instrumentMetrics.fiscalEndDate);
      this.form.controls['currency'].setValue(this.currencies.filter(instrument => instrument.businesskey === instrumentMetrics.currencyKey)[0]);
      this.form.controls['expectedCashflowGrowth'].setValue(instrumentMetrics.expectedCashflowGrowth);
      this.form.controls['avgMarktcapFreeCashflowRatio'].setValue(instrumentMetrics.avgMarktcapFreeCashflowRatio);
      this.form.controls['expectedFreeCashflowOverride'].setValue(instrumentMetrics.expectedFreeCashflowOverride);
      this.form.controls['sharesOutstanding'].setValue(instrumentMetrics.sharesOutstanding);
      this.form.controls['revenue'].setValue(instrumentMetrics.revenue);
      this.form.controls['capitalExpenditures'].setValue(instrumentMetrics.capitalExpenditures);
      this.form.controls['operatingCashflow'].setValue(instrumentMetrics.operatingCashflow);
      this.form.controls['eps'].setValue(instrumentMetrics.eps);
      this.form.controls['totalLiabilities'].setValue(instrumentMetrics.totalLiabilities);
      this.form.controls['shortLongTermDebtTotal'].setValue(instrumentMetrics.shortLongTermDebtTotal);
      this.form.controls['totalCash'].setValue(instrumentMetrics.totalCash);
      this.form.controls['dilutedEPS5Y'].setValue(instrumentMetrics.dilutedEPS5Y);
      this.form.controls['dividendPerShare'].setValue(instrumentMetrics.dividendPerShare);
      this.form.controls['sector'].setValue(instrumentMetrics.sector);
      this.form.controls['country'].setValue(instrumentMetrics.country);
      this.form.controls['goodwill'].setValue(instrumentMetrics.goodwill);
      this.form.controls['ebitda'].setValue(instrumentMetrics.ebitda);
      this.form.controls['ebit'].setValue(instrumentMetrics.ebit);
      this.form.controls['grossProfit'].setValue(instrumentMetrics.grossProfit);
      this.form.controls['totalEquity'].setValue(instrumentMetrics.totalEquity);
      this.form.controls['totalAssets'].setValue(instrumentMetrics.totalAssets);
      this.form.controls['currentLiabilities'].setValue(instrumentMetrics.currentLiabilities);
      this.form.controls['hasDividendsOrBuyBacks'].setValue(instrumentMetrics.hasDividendsOrBuyBacks);
      this.form.controls['operatingIncome'].setValue(instrumentMetrics.operatingIncome);
      this.form.controls['operatingIncomeLastYear'].setValue(instrumentMetrics.operatingIncomeLastYear);
      this.form.controls['securityLifecyclePhaseOverride'].setValue(instrumentMetrics.securityLifecyclePhaseOverride);
      this.form.controls['forwardSales'].setValue(instrumentMetrics.forwardSales);
      this.form.controls['forwardFCF'].setValue(instrumentMetrics.forwardFCF);
      this.form.controls['metricScore'].setValue(instrumentMetrics.metricScore);
      this.form.controls['moatScore'].setValue(instrumentMetrics.moatScore);
      this.form.controls['riskScore'].setValue(instrumentMetrics.riskScore);
      this.form.controls['growthScore'].setValue(instrumentMetrics.growthScore);
      this.form.controls['comment'].setValue(instrumentMetrics.comment);
      this.initExpectedFCFPerYear();
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
      if (this.form.value.expectedFreeCashflowOverride != null) metrics.expectedFreeCashflowOverride = this.form.value.expectedFreeCashflowOverride;
      if (this.form.value.sharesOutstanding != null) metrics.sharesOutstanding = this.form.value.sharesOutstanding;
      if (this.form.value.revenue != null) metrics.revenue = this.form.value.revenue;
      if (this.form.value.capitalExpenditures != null) metrics.capitalExpenditures = this.form.value.capitalExpenditures;
      if (this.form.value.operatingCashflow != null) metrics.operatingCashflow = this.form.value.operatingCashflow;
      if (this.form.value.eps != null) metrics.eps = this.form.value.eps;
      if (this.form.value.totalLiabilities != null) metrics.totalLiabilities = this.form.value.totalLiabilities;
      if (this.form.value.shortLongTermDebtTotal != null) metrics.shortLongTermDebtTotal = this.form.value.shortLongTermDebtTotal;
      if (this.form.value.totalCash != null) metrics.totalCash = this.form.value.totalCash;
      if (this.form.value.dilutedEPS5Y != null) metrics.dilutedEPS5Y = this.form.value.dilutedEPS5Y;
      if (this.form.value.dividendPerShare != null) metrics.dividendPerShare = this.form.value.dividendPerShare;
      if (this.form.value.sector != null) metrics.sector = this.form.value.sector;
      if (this.form.value.country != null) metrics.country = this.form.value.country;
      if (this.form.value.goodwill != null) metrics.goodwill = this.form.value.goodwill;
      if (this.form.value.ebitda != null) metrics.ebitda = this.form.value.ebitda;
      if (this.form.value.ebit != null) metrics.ebit = this.form.value.ebit;
      if (this.form.value.grossProfit != null) metrics.grossProfit = this.form.value.grossProfit;
      if (this.form.value.totalEquity != null) metrics.totalEquity = this.form.value.totalEquity;
      if (this.form.value.totalAssets != null) metrics.totalAssets = this.form.value.totalAssets;
      if (this.form.value.currentLiabilities != null) metrics.currentLiabilities = this.form.value.currentLiabilities;
      if (this.form.value.hasDividendsOrBuyBacks != null) metrics.hasDividendsOrBuyBacks = this.form.value.hasDividendsOrBuyBacks;
      if (this.form.value.operatingIncome != null) metrics.operatingIncome = this.form.value.operatingIncome;
      if (this.form.value.operatingIncomeLastYear != null) metrics.operatingIncomeLastYear = this.form.value.operatingIncomeLastYear;
      if (this.form.value.securityLifecyclePhaseOverride != null) metrics.securityLifecyclePhaseOverride = this.form.value.securityLifecyclePhaseOverride;
      if (this.form.value.forwardSales != null) metrics.forwardSales = this.form.value.forwardSales;
      if (this.form.value.forwardFCF != null) metrics.forwardFCF = this.form.value.forwardFCF;  
      if (this.form.value.metricScore != null) metrics.metricScore = this.form.value.metricScore;
      if (this.form.value.moatScore != null) metrics.moatScore = this.form.value.moatScore;
      if (this.form.value.riskScore != null) metrics.riskScore = this.form.value.riskScore;
      if (this.form.value.growthScore != null) metrics.growthScore = this.form.value.growthScore;
      if (this.form.value.comment != null) metrics.comment = this.form.value.comment;
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
      metrics.lastManualReviewTs = new Date(Date.now());
      this.service.saveSecurityMetrics(metrics);
    }
  }
}
