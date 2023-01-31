import { PrizeWinnerShare } from 'interfaces/db/tables';
import { ContestPrizeType } from 'modules/contest/enums/contestPrizeType.enum';
export interface PrizeContestInstanceDetails {
    prizeType: ContestPrizeType;
    prizeWinnerShare: PrizeWinnerShare;
}
