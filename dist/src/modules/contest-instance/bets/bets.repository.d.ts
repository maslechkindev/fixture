import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BetsSettlementDetails } from './interfaces/bets-settlement-details';
import { BetStatus } from '../enums/betStatus';
export declare class BetsRepository {
    private readonly knex;
    constructor(knex: Knex);
    setBetsStatus(txManager: TransactionManagerService, betsSettlementDetails: BetsSettlementDetails, status: BetStatus): Promise<void>;
}
