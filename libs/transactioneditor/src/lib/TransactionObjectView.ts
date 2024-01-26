import { Instrument, TransactionTypeEnum } from "@mffrontend/shared/data-access-mfdata";

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