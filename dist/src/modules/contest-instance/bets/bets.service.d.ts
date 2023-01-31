import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { ContestInstanceParticipantsService } from '../contest-instance-participants/contest-instance-participants.service';
import { BetsRepository } from './bets.repository';
import { BetsSettlementDetails } from './interfaces/bets-settlement-details';
import { RealtimeDbService } from 'modules/integrations/firebase/realtime-db/realtime-db.service';
export declare class BetsService {
    private readonly transactionManager;
    private readonly betsRepository;
    private readonly contestInstanceParticipantsService;
    private realtimeDbService;
    constructor(transactionManager: TransactionManager, betsRepository: BetsRepository, contestInstanceParticipantsService: ContestInstanceParticipantsService, realtimeDbService: RealtimeDbService);
    settleBets(betsSettlementDetails: BetsSettlementDetails): Promise<void>;
}
