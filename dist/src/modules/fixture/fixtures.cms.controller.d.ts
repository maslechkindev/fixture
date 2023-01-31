import { FixtureService } from './fixture.service';
import { GetFixturesDto, GetFixturesRequestDto } from './dto/getfixtures.dto';
import { GetFixtureResponseDto } from './dto/getFixture.dto';
import { UpdateFixtureDto, UpdateFixtureResponseDto } from './dto/updateFixture.dto';
import { GetFixtureContestsRequestDto, GetFixtureContestsResponseDto } from './dto/getFixtureContests.dto';
import { PostFixtureCreateContestsBulkRequestDto, PostFixtureCreateContestsBulkResponseDto } from './dto/postFixtureCreateContestsBulk.dto';
import { CmsService } from 'modules/integrations/cms/cms.service';
import { ContestService } from 'modules/contest/contest.service';
import { CancelContestInstanceService } from 'modules/contest-instance/cancel/cancel.service';
import { ContestInstanceService } from 'modules/contest-instance/contest-instance.service';
import { ContestInstanceParticipantsService } from 'modules/contest-instance/contest-instance-participants/contest-instance-participants.service';
import { GetFixtureContestResponseDto } from './dto/getFixtureContest';
import { GetFixtureMarketsRequestDto, GetFixtureMarketsResponseDto } from './dto/getFixtureMarkets.dto';
import { PostFixtureStartFreeBetsDto, PostFixtureStartFreeBetsResponseDto } from './dto/postFixtureStatFreeBets.dto';
import { PostLockOddsChangeDto, PostLockOddsChangeResponseDto } from './dto/postLockOddsChange.dto';
import { UpdateFixtureContestDto } from './dto/updateFixtureContest.dto';
export declare class FixturesCmsController {
    private readonly fixtureService;
    private readonly cmsService;
    private readonly contestService;
    private readonly contestInstanceService;
    private readonly contestInstanceParticipantService;
    private readonly cancelContestInstanceService;
    constructor(fixtureService: FixtureService, cmsService: CmsService, contestService: ContestService, contestInstanceService: ContestInstanceService, contestInstanceParticipantService: ContestInstanceParticipantsService, cancelContestInstanceService: CancelContestInstanceService);
    private readonly logger;
    getFixtures(params: GetFixturesRequestDto): Promise<GetFixturesDto>;
    getParticicpantsInfo(params: {
        instanceId: string;
        page: number;
        size: number;
        search: string;
    }): Promise<{
        participantsInfo: ({
            prize: string;
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        } | {
            prize: number;
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        } | {
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        })[];
        count: number;
    }>;
    getContestInstancesByContestId(contestId: string, params: {
        page: number;
        size: number;
    }): Promise<any[]>;
    getFixture(fixtureId: string): Promise<GetFixtureResponseDto>;
    updateFixture(fixtureId: string, body: UpdateFixtureDto): Promise<UpdateFixtureResponseDto>;
    getFixtureContests(fixtureId: string, params: GetFixtureContestsRequestDto): Promise<GetFixtureContestsResponseDto>;
    countFixtureContests(fixtureId: string): Promise<number | string>;
    getActiveFixtureMarkets(fixtureId: string, params: GetFixtureMarketsRequestDto): Promise<GetFixtureMarketsResponseDto>;
    getFixtureContest(fixtureId: string, contestId: string): Promise<GetFixtureContestResponseDto>;
    updateFixtureContest(body: UpdateFixtureContestDto): Promise<{
        success: boolean;
    }>;
    getFixtureCustomContestIds(fixtureId: string): Promise<number[]>;
    excludeParticipant(body: {
        instanceId: string;
        participantId: string;
        reasonOfExclude: string;
    }, contestId: string): Promise<{
        isExcluded: boolean;
        userId: string;
    }>;
    finishInstance(contestId: string, body: {
        contestInstanceId: string;
        contestName: string;
    }): Promise<{
        success: boolean;
    }>;
    cancelInstance(contestId: string, body: {
        contestInstanceId: string;
        forcedCancel: boolean;
        contestName: string;
    }): Promise<{
        success: boolean;
    }>;
    postFixtureCreateContestsBulk(fixtureId: string, body: PostFixtureCreateContestsBulkRequestDto): Promise<PostFixtureCreateContestsBulkResponseDto>;
    performAction(operationType: string, fixtureId: string): Promise<{
        success: boolean;
    }>;
    fixtureStartFreeBet(fixtureId: string, body: PostFixtureStartFreeBetsDto): Promise<PostFixtureStartFreeBetsResponseDto>;
    lockOddsChange(body: PostLockOddsChangeDto): Promise<PostLockOddsChangeResponseDto>;
    getDynamicLink(contestId: string): Promise<{
        success: boolean;
        link: boolean;
    } | {
        success: boolean;
        link: string;
    }>;
    viewBets(queryParams: {
        page: string;
        size: string;
        orderBy: string;
        direction: string;
    }, params: {
        instanceId: string;
        participantId: string;
    }): Promise<{
        betsInfo: {
            betTime: string;
            betName: string;
        }[];
        fullCount: any;
    }>;
}
