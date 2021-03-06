/**
 * Dac Services
 * Dac Service REST API
 *
 * OpenAPI spec version: 1.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Cashflow } from './cashflow';
import { Trade } from './trade';


export interface Transaction { 
    transactionid: number;
    description: string;
    transactiondate: string;
    lastchanged: Date;
    trades?: Array<Trade>;
    cashflows: Array<Cashflow>;
    transactionType: Transaction.TransactionTypeEnum;
}
export namespace Transaction {
    export type TransactionTypeEnum = 'INCOMEEXPENSES' | 'TRANSFER' | 'BUDGETTRANSFER' | 'SECURITYCASHFLOW' | 'TRADE';
    export const TransactionTypeEnum = {
        INCOMEEXPENSES: 'INCOMEEXPENSES' as TransactionTypeEnum,
        TRANSFER: 'TRANSFER' as TransactionTypeEnum,
        BUDGETTRANSFER: 'BUDGETTRANSFER' as TransactionTypeEnum,
        SECURITYCASHFLOW: 'SECURITYCASHFLOW' as TransactionTypeEnum,
        TRADE: 'TRADE' as TransactionTypeEnum
    };
}
