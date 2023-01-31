import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BalanceService } from 'modules/balance/balance.service';
import { FirestoreTransactionOptions } from 'modules/integrations/firebase/firestore/interfaces/firestoreTransactionOptions';
import { PrizeContestInstanceDetails } from '../interfaces/prize-contest-instance-details.interface';
import { WinAmountCalculationService } from './win-amount-calculation.service';
import { TemplateGeneratorParamsType } from 'modules/fixture/types/templateGeneratorType';
export declare class WinnersRewardingService {
    private winAmountCalculationService;
    private balanceService;
    constructor(winAmountCalculationService: WinAmountCalculationService, balanceService: BalanceService);
    rewardWinners(txManager: TransactionManagerService, contestInstanceId: string, prizeDetails: PrizeContestInstanceDetails & {
        fixtureName: string;
    }, contestName: string, options: FirestoreTransactionOptions, fixtureName: string, templateGenerator?: (params: TemplateGeneratorParamsType) => string, instanceStatus?: string): Promise<void>;
}
