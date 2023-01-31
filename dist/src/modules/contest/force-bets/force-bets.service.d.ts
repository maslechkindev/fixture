import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { ForceBetsRepository } from './force-bets.repository';
import { CmsForceBet } from 'modules/integrations/cms/dto/contest.dto';
import { ForceBet } from 'interfaces/db/tables';
import CustomFreeBetInterface from '../../fixture/interfaces/customFreeBet';
export declare class ForceBetsService {
    private readonly forceBetsRepository;
    constructor(forceBetsRepository: ForceBetsRepository);
    addForceBet(txManager: TransactionManagerService, forceBet: CmsForceBet, contestId: string, lockOdds: {
        [key: string]: {
            americanOdds: number;
            odds: number;
            referenceId: string;
            statusId: string;
        };
    }, contestTemplateId: number): Promise<ForceBet[]>;
    addCustomForceBet(txManager: TransactionManagerService, forceBet: CustomFreeBetInterface, marketTypes: Array<string>, contestId: string, lockOdds: {
        [key: string]: {
            americanOdds: number;
            odds: number;
            referenceId: string;
            statusId: string;
        };
    }): Promise<ForceBet[]>;
    stopForceBet(txManager: TransactionManagerService, forceBetId: string): Promise<number>;
    getForceBets(txManager: TransactionManagerService, forceBet: Partial<ForceBet>): Promise<import("interfaces/db/tables").SerializedForceBet[]>;
    lockOddsUpdateOnActiveForceBets(txManager: TransactionManagerService, contests: Array<string>): Promise<Array<ForceBet>>;
}
