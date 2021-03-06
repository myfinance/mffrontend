import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {RecurrentTransaction} from '../../../../../myfinance-tsclient-generated';
import {RecurrentTransactionFEModel, RecurrentTransactionService} from '../../services/recurrenttransaction.service';

@Component({
  selector: 'app-recurrenttransactionview',
  templateUrl: './recurrenttransactionview.component.html',
  styleUrls: ['./recurrenttransactionview.component.css']
})
export class RecurrenttransactionviewComponent implements OnInit  {

  @Input() data: any;

  options: GridOptions;
  private gridApi;

  title = 'RecurrentTransactions';

  constructor(private recurrentTransactionservice: RecurrentTransactionService) {
    this.recurrentTransactionservice.recurrentTransactionSubject.subscribe(
      () => {
        this.loadData()}
    );
  }

  ngOnInit() {
    this.options = <GridOptions>{
      rowSelection: 'single',
      onSelectionChanged: () => this.onSelectionChanged(),
      onGridReady: (params) => this.onGridReady(params),
      floatingFilter: true,
      resizeable: true,
      sortable: true,
      sideBar: 'filters',
      suppressPropertyNamesCheck: true,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      groupIncludeFooter: true,
      rowGroupPanelShow: 'always',
      animateRows: true,
      columnDefs: [
        {headerName: 'TransactionType', field: 'recurrencytype', rowGroup: true},
        {headerName: 'Id', field: 'Id', maxWidth: 100 },
        {headerName: 'Beschreibung', field: 'description'},
        {headerName: 'Nächste Transaktion', field: 'nexttransaction'},
        {headerName: 'Betrag', field: 'value', aggFunc: 'sum'},
        {headerName: 'Frequenz', field: 'recurrentfrequence'},
        {headerName: 'Instrument1', field: 'instrument1'},
        {headerName: 'Instrument2', field: 'instrument2'},
      ]
    };
  }

  private loadData(): void {
    if (this.options.api != null) {
      this.options.api.setRowData(this.recurrentTransactionservice.getRecurrentTransactions());
      this.options.api.forEachNode(function(node) {
        node.setExpanded(true);
      });
      this.options.api.sizeColumnsToFit();
    }
  }

  onSelectionChanged(): void {
    const selectedTransaction: RecurrentTransactionFEModel = this.options.api.getSelectedRows()[0];
    this.recurrentTransactionservice.setTransactionfilter(selectedTransaction);
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    if (this.recurrentTransactionservice.getIsInit()) {
      this.loadData();
    }
  }
}
