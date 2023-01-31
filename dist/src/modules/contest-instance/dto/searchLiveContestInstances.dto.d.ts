export declare class SearchUserContestInstancesDto {
    subString: string;
    userId: string;
}
export declare class SearchUserContestInstanceResponseDto {
    contestId: string;
    instanceId: string;
    instanceNumber: number;
    instanceName: string;
    type: string;
    currentParticipants: number;
    maxParticipants: number | null;
    entryCurrency: string;
    entryFee: number;
    prizeAmount: string;
    leavingAllowed: boolean;
    templateId?: string;
}
export declare class WrappedSearchUserInstanceResponseDto {
    data: SearchUserContestInstanceResponseDto[];
}
