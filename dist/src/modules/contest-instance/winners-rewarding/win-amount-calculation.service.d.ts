import { PrizeWinnerShare } from 'interfaces/db/tables';
import { ContestInstanceParticipantsService } from '../contest-instance-participants/contest-instance-participants.service';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { ContestPrizeType } from 'modules/contest/enums/contestPrizeType.enum';
import { Currency } from 'enums/currency';
import { LeaderboardRow } from '../dto/getContestInstanceLeaderboard.dto';
export declare class WinAmountCalculationService {
    private participantsService;
    constructor(participantsService: ContestInstanceParticipantsService);
    calculateParticipantWinAmounts(txManager: TransactionManagerService, contestInstanceId: string, prizeDetails: {
        prizeWinnerShare: PrizeWinnerShare;
        prizeType: ContestPrizeType;
    }): Promise<{
        userId: string;
        winAmount: string;
        currency: Currency;
        place: string;
    }[]>;
    calculateParticipantWinAmountsForLeaderboard(txManager: TransactionManagerService, contestInstanceId: string, prizeDetails: {
        prizeWinnerShare: PrizeWinnerShare;
        prizeType: ContestPrizeType;
    }, participantLeaderboard: Array<LeaderboardRow>): Promise<(LeaderboardRow & {
        prize: string | number;
        prizeType: Currency | ContestPrizeType;
    })[]>;
}
