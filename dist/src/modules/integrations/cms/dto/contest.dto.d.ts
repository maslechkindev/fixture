export declare class CmsContestSize {
    id: number;
    minParticipantsNumber: number;
    maxParticipantsNumber: number | null;
    allowsLeaving: boolean;
}
export declare class CmsPrize {
    id: number;
    component: string;
    amount?: number;
    shortDescription?: string;
    winnerShare?: PrizeWinnerShare[];
}
export declare class PrizeWinnerShare {
    id: number;
    winnersNumber: number;
    places: string;
    winSharePerPlace: number;
    totalShare: number;
    exactAmountPerPlace: number;
    fullDescription: string;
}
export declare class CmsEntryRules {
    id: number;
    freeEntry: boolean;
    tokensAmount: number;
    amount: number;
}
export declare class CmsRmEntryRules {
    id: number;
    amount: number;
}
export declare class CmsCompetition {
    id: number;
    competitionName: string;
    competitionId: number;
    sportCompetitionId: number;
}
export declare class CmsRegistrationTimeRegistrationStartPeriod {
    id: number;
    periodName: string;
    periodId: string;
    competitions: [string];
}
export declare class CmsRegistrationTime {
    id: number;
    registrationStartTime: number;
    registrationStartPeriod: CmsRegistrationTimeRegistrationStartPeriod;
    cancellationTime: number;
    lateEntryPeriodId?: string;
}
export declare class CmsPeriod {
    id: number;
    periodName: string;
    periodId: string;
    parentId: string;
    competitions: Array<string>;
}
export declare class CmsCompetitionAndPeriod {
    id: number;
    competitions: Array<CmsCompetition>;
    period: CmsPeriod;
}
export declare class StartPeriod {
    id: number;
    periodName: string;
    periodId: string;
    parentId: string;
    competitions: number[];
}
export declare class MarketType {
    id: number;
    marketType: string;
    typeId: string;
    description: string;
    sport: number;
}
export declare class CmsForceBet {
    id: number;
    durationMin: number;
    startPeriod: StartPeriod;
    delayMin: number;
    betLimit: number;
    marketTypes: Array<MarketType>;
    info: string;
    title: string;
    notifyInSec: number;
    lockOdds: boolean;
}
export declare class CmsContestDto {
    id: number;
    productType: string;
    contestName?: string;
    contestType: string;
    contestSize: CmsContestSize;
    bankrollAmount: number;
    prizes: Array<CmsPrize>;
    entryRules: CmsEntryRules;
    RMEntryRules: CmsRmEntryRules;
    registrationTime: CmsRegistrationTime;
    marketGroupId: number;
    competitionAndPeriod: CmsCompetitionAndPeriod;
    forceBets?: Array<CmsForceBet>;
    contestOwner?: string;
    homeVisible?: boolean;
}
export declare class CmsContestsGroupsPeriod {
    id: number;
    competition_periods: number | null;
    Periods_group_name: string;
    Periods: null | unknown;
    Period: {
        id: number;
        period_name: string;
        period_id: string;
        parent_id: string;
        competition: Array<unknown>;
        created_at: Date;
        updated_at: Date;
    };
    Contests: Array<unknown>;
}
export declare class CmsTopNavigation {
    id: number;
    Competitions: {
        id: number;
        Competition_name: string;
        Competition_id: string;
        sport_competition_id: number;
    };
    Display: boolean;
    Periods: Array<CmsContestsGroupsPeriod>;
}
