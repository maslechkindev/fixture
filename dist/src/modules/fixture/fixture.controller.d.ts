import { FixtureService } from './fixture.service';
import { ActiveFixtureDto, GetActiveFixturesRequestDto } from './dto/getActiveFixtures.dto';
export declare class FixtureController {
    private readonly fixtureService;
    constructor(fixtureService: FixtureService);
    getActiveFixtures(params: GetActiveFixturesRequestDto): Promise<Array<Partial<ActiveFixtureDto>>>;
}
