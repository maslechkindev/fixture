export declare class PostFixtureCreateContestsBulkRequestDto {
    id: string;
    cmsContestTemplateIds: string;
}
export declare class PostFixtureCreateContestsBulkResponseDto {
    success: boolean;
    notCreatedContests: string[];
}
export declare class WrappedPostFixtureCreateContestsBulkResponseDto {
    data: PostFixtureCreateContestsBulkResponseDto;
}
