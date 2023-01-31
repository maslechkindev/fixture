import { BetOutcome } from 'modules/contest-instance/enums/betOutcome';
export interface BetsSettlementDetails {
    marketLineId: string;
    betOutcome: BetOutcome;
}
