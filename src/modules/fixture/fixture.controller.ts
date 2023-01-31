import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FixtureService } from './fixture.service';
import { ApiOkResponse } from 'helpers/swagger/decorators';
import { ApiBearerAuth } from 'helpers/swagger/decorators';
import {
  ActiveFixtureDto,
  GetActiveFixturesRequestDto,
  WrappedGetActiveFixturesResponse,
} from './dto/getActiveFixtures.dto';

@ApiBearerAuth()
@ApiTags('Fixture')
@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @ApiOkResponse({
    type: WrappedGetActiveFixturesResponse,
    description: 'Success',
  })
  @Get('/active')
  async getActiveFixtures(
    @Query() params: GetActiveFixturesRequestDto,
  ): Promise<Array<Partial<ActiveFixtureDto>>> {
    const fixtures = await this.fixtureService.getActive(params);
    return fixtures;
  }
}
