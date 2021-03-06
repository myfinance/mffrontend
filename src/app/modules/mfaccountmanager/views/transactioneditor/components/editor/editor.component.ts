import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../../../../../myfinance-tsclient-generated';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  transactionId = -1;
  transactionSelected = false;
  selectedTransaction: Transaction;

  constructor(private formBuilder: FormBuilder, private transactionservice: TransactionService) {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', dateInputFormat: 'YYYY-MM-DD'});
    this.editForm = this.formBuilder.group({
      description: ['', Validators.required],
      transactionDate: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.editForm.disable();
    this.transactionservice.transactionFilterSubject.subscribe(
      () => {
        this.loadData()}
    )
  }

  loadData() {
    this.editForm.reset();
    this.transactionId = this.transactionservice.getTransactionfilter();
    if (this.transactionId !== -1) {
      this.transactionSelected = true;
      this.editForm.enable();
      this.selectedTransaction = this.transactionservice.getTransactions().filter(i => i.transactionid === this.transactionId)[0];
      this.editForm.controls.description.setValue(this.selectedTransaction.description);
      this.editForm.controls.transactionDate.setValue(this.selectedTransaction.transactiondate)
      this.editForm.controls.value.setValue(this.selectedTransaction.cashflows[0].value);
    } else {
      this.transactionSelected = false;
      this.editForm.disable();
    }
  }

  onUpdateTransaction() {
    this.transactionservice.updateTransaction(this.editForm.value.description,
      this.transactionId,
      this.editForm.value.value,
      this.editForm.value.transactionDate);
    this.editForm.reset();
  }

  onDeleteTransaction() {
    this.transactionservice.deleteTransaction(this.transactionId);
    this.editForm.reset();
  }
}
