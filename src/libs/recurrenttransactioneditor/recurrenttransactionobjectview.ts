import { RecurrentFrequencyEnum } from "../shared/data-access-mfdata/model/recurrenttransaction";
import { TransactionTypeEnum } from "../shared/data-access-mfdata/model/transaction";
import { Instrument } from "../shared/data-access-mfdata/shared-data-access-mfdata.module";


export interface RecurrentTransactionObjectView { 
    id: string;
    transactionType: TransactionTypeEnum;
    description: string;
    nexttransactiondate: Date;
    instrument1: Instrument | undefined;
    instrument2: Instrument | undefined;
    value: number;
    recurrentFrequency: RecurrentFrequencyEnum;
  }