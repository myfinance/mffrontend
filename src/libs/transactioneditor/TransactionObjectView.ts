import { TransactionTypeEnum } from "../shared/data-access-mfdata/model/transaction";
import { Instrument } from "../shared/data-access-mfdata/shared-data-access-mfdata.module";


export interface TransactionObjectView { 
    id: string;
    transactionType: TransactionTypeEnum;
    description: string;
    transactiondate: Date;
    instrument1: Instrument | undefined;
    instrument2: Instrument | undefined;
    instrument3: Instrument | undefined;
    value: number;
  }