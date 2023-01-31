import { ContestInstanceService } from './contest-instance.service';
import { SearchUserContestInstanceResponseDto, SearchUserContestInstancesDto } from './dto/searchLiveContestInstances.dto';
export declare class ContestInstanceCmsController {
    private readonly contestInstanceService;
    constructor(contestInstanceService: ContestInstanceService);
    searchLiveContestInstances({ userId, subString }: SearchUserContestInstancesDto): Promise<SearchUserContestInstanceResponseDto[]>;
}
