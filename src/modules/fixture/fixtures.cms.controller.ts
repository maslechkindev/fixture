import {
  Query,
  Controller,
  Body,
  Get,
  Put,
  HttpCode,
  Param,
  Post,
  Logger,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
} from 'helpers/swagger/decorators';
import * as R from 'ramda';

import { FixtureService } from './fixture.service';
import {
  GetFixturesDto,
  GetFixturesRequestDto,
  WrappedGetFixturesResponse,
} from './dto/getfixtures.dto';
import {
  BadRequestExceptionCustom,
  ERRORS,
  NotFoundExceptionCustom,
} from 'helpers/errors';
import {
  GetFixtureResponseDto,
  WrappedGetFixtureResponseDto,
} from './dto/getFixture.dto';
import {
  UpdateFixtureDto,
  UpdateFixtureResponseDto,
  WrappedUpdateFixtureResponseDto,
} from './dto/updateFixture.dto';
import {
  GetFixtureContestsRequestDto,
  GetFixtureContestsResponseDto,
  WrappedGetFixtureContestsResponseDto,
} from './dto/getFixtureContests.dto';
import { WrappedGetFixtureCustomContestIdsResponseDto } from './dto/getFixtureCustomContestIds.dto';
import {
  PostFixtureCreateContestsBulkRequestDto,
  PostFixtureCreateContestsBulkResponseDto,
  WrappedPostFixtureCreateContestsBulkResponseDto,
} from './dto/postFixtureCreateContestsBulk.dto';
import { isBefore, subMinutes } from 'date-fns';
import { CmsService } from 'modules/integrations/cms/cms.service';
import { ContestService } from 'modules/contest/contest.service';
import { CancelContestInstanceService } from 'modules/contest-instance/cancel/cancel.service';
import { ContestInstanceService } from 'modules/contest-instance/contest-instance.service';
import { ContestInstanceParticipantsService } from 'modules/contest-instance/contest-instance-participants/contest-instance-participants.service';
import {
  GetFixtureContestResponseDto,
  WrappedGetFixtureContestResponseDto,
} from './dto/getFixtureContest';
import {
  GetFixtureMarketsRequestDto,
  GetFixtureMarketsResponseDto,
} from './dto/getFixtureMarkets.dto';
import { FixtureStatusId } from './enums/fixture-status-id.enum';
import {
  PostFixtureStartFreeBetsDto,
  PostFixtureStartFreeBetsResponseDto,
  WrappedPostFixtureStartFreeBetsResponseDto,
} from './dto/postFixtureStatFreeBets.dto';
import {
  PostLockOddsChangeDto,
  PostLockOddsChangeResponseDto,
} from './dto/postLockOddsChange.dto';
import { UpdateFixtureContestDto } from './dto/updateFixtureContest.dto';

@ApiTags('CMS Fixture Management')
@Controller('cms/fixture-management/fixtures')
export class FixturesCmsController {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly cmsService: CmsService,
    private readonly contestService: ContestService,
    private readonly contestInstanceService: ContestInstanceService,
    private readonly contestInstanceParticipantService: ContestInstanceParticipantsService,
    private readonly cancelContestInstanceService: CancelContestInstanceService,
  ) {}
  private readonly logger = new Logger(FixturesCmsController.name);
  @ApiOkResponse({
    type: WrappedGetFixturesResponse,
    description: 'Success',
  })
  @ApiBadRequestResponse({
    schema: {
      anyOf: [
        {
          example: new BadRequestExceptionCustom(
            ERRORS.UNKNOWN_REFERRAL_CODE,
          ).getResponse(),
        },
      ],
    },
    description: 'Success',
  })
  @Get('/')
  async getFixtures(
    @Query() params: GetFixturesRequestDto,
  ): Promise<GetFixturesDto> {
    const { statuses, page, size, direction, orderBy, search } = params;
    const { fixtures, count } = await this.fixtureService.getAll({
      statuses,
      page,
      size,
      direction,
      orderBy,
      search,
    });
    return { fixtures, count };
  }
  @Get('/participantsInfo')
  async getParticicpantsInfo(
    @Query()
    params: {
      instanceId: string;
      page: number;
      size: number;
      search: string;
    },
  ) {
    const { instanceId, page, size, search } = params;
    const response =
      await this.contestInstanceService.getParticipantsInfoByInstanceId(
        instanceId,
        page,
        size,
        search,
      );
    return response;
  }

  @Get('/:contestId/instances')
  async getContestInstancesByContestId(
    @Param('contestId') contestId: string,
    @Query() params: { page: number; size: number },
  ) {
    const { page, size } = params;
    const response = await this.contestService.getContestInstancesByContestId(
      contestId,
      { page, size },
    );
    return response;
  }

  @ApiOkResponse({
    type: WrappedGetFixtureResponseDto,
    description: 'Success',
  })
  @Get('/:fixtureId')
  async getFixture(
    @Param('fixtureId') fixtureId: string,
  ): Promise<GetFixtureResponseDto> {
    const fixture = await this.fixtureService.getFixtureById(fixtureId);
    return { fixture };
  }

  @ApiOkResponse({
    type: WrappedUpdateFixtureResponseDto,
    description: 'Successfully updated fixture',
  })
  @ApiBadRequestResponse({
    schema: {
      anyOf: [
        {
          example: new NotFoundExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
          ).getResponse(),
        },
      ],
    },
    description: 'Success',
  })
  @HttpCode(200)
  @Put('/:fixtureId')
  async updateFixture(
    @Param('fixtureId') fixtureId: string,
    @Body() body: UpdateFixtureDto,
  ): Promise<UpdateFixtureResponseDto> {
    const { fixture: fixtureFromBody, markets, contests, marketLines } = body;
    const fixture = await this.fixtureService.getFixtureById(fixtureId);
    if (!fixture) {
      throw new NotFoundExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
      );
    }
    await this.fixtureService.updateFixture(fixtureFromBody, fixture);
    if (Array.isArray(markets) && markets.length > 0) {
      await this.fixtureService.updateFixtureMarkets(fixture, markets);
    }
    if (Array.isArray(contests) && contests.length > 0) {
      await this.fixtureService.updateContests(contests);
    }
    if (Array.isArray(marketLines) && marketLines.length > 0) {
      await this.fixtureService.updateMarketLines(marketLines);
    }
    return { success: true };
  }

  @ApiOkResponse({
    type: WrappedGetFixtureContestsResponseDto,
    description: 'Success',
  })
  @Get('/:fixtureId/contests')
  async getFixtureContests(
    @Param('fixtureId') fixtureId: string,
    @Query() params: GetFixtureContestsRequestDto,
  ): Promise<GetFixtureContestsResponseDto> {
    const { page, size, direction, orderBy, search } = params;
    const { contests, count } =
      await this.fixtureService.getFixtureContestsByFixtureId(fixtureId, {
        page,
        size,
        direction,
        orderBy,
        search,
      });
    return { contests, count };
  }
  @Get('/:fixtureId/contests/count')
  async countFixtureContests(
    @Param('fixtureId') fixtureId: string,
  ): Promise<number | string> {
    const counter = await this.fixtureService.countFixtureContests(fixtureId);
    return counter;
  }

  @ApiOkResponse({
    type: WrappedGetFixtureContestsResponseDto,
    description: 'Success',
  })
  @Get('/:fixtureId/markets')
  async getActiveFixtureMarkets(
    @Param('fixtureId') fixtureId: string,
    @Query() params: GetFixtureMarketsRequestDto,
  ): Promise<GetFixtureMarketsResponseDto> {
    const { page, size, direction, orderBy, marketLines: marketId } = params;
    let marketLines = null;
    const { markets, count, cmsInfo } =
      await this.fixtureService.getActiveFixtureMarketsByFixtureId(fixtureId, {
        page,
        size,
        direction,
        orderBy,
      });
    if (typeof marketId !== 'undefined' && marketId !== null) {
      marketLines = await this.fixtureService.getMarketLinesForMarket(
        marketId,
        fixtureId,
      );
    }
    return { markets, count, cmsInfo, marketLines };
  }

  @ApiOkResponse({
    type: WrappedGetFixtureContestResponseDto,
    description: 'Success',
  })
  @Get('/:fixtureId/contests/:contestId')
  async getFixtureContest(
    @Param('fixtureId') fixtureId: string,
    @Param('contestId') contestId: string,
  ): Promise<GetFixtureContestResponseDto> {
    const contest = await this.fixtureService.getFixtureContestById(
      fixtureId,
      contestId,
    );
    return { contest };
  }

  @ApiOkResponse({
    type: WrappedGetFixtureContestResponseDto,
    description: 'Success',
  })
  @Put('/:fixtureId/contests/:contestId')
  async updateFixtureContest(
    @Body() body: UpdateFixtureContestDto,
  ): Promise<{ success: boolean }> {
    const updateData = R.pick(
      [
        'contestOwnerResourceLink',
        'contestOwnerLabelName',
        'contestName',
        'streamLive',
      ],
      body,
    );

    await this.fixtureService.updateFixtureContestById(body.id, updateData);
    return { success: true };
  }

  @ApiOkResponse({
    type: WrappedGetFixtureCustomContestIdsResponseDto,
    description: 'Success',
  })
  @Get('/:fixtureId/custom-contest-ids')
  async getFixtureCustomContestIds(
    @Param('fixtureId') fixtureId: string,
  ): Promise<number[]> {
    const customContestIds =
      await this.fixtureService.getFixtureCustomContestIds(fixtureId);
    return customContestIds;
  }

  @Put('/contests/:contestId/exclude-participant')
  async excludeParticipant(
    @Body()
    body: {
      instanceId: string;
      participantId: string;
      reasonOfExclude: string;
    },
    @Param('contestId') contestId: string,
  ) {
    const { instanceId, participantId, reasonOfExclude } = body;

    const result =
      await this.contestInstanceParticipantService.excludeParticipant(
        instanceId,
        participantId,
        reasonOfExclude,
        contestId,
      );
    return result;
  }
  @Put('/contests/:contestId/finish-instance')
  async finishInstance(
    @Param('contestId') contestId: string,
    @Body() body: { contestInstanceId: string; contestName: string },
  ) {
    const { contestInstanceId, contestName } = body;
    await this.contestInstanceService.finishContestInstance(
      contestInstanceId,
      contestId,
      contestName,
    );
    return { success: true };
  }
  @Put('/contests/:contestId/cancel-instance')
  async cancelInstance(
    @Param('contestId') contestId: string,
    @Body()
    body: {
      contestInstanceId: string;
      forcedCancel: boolean;
      contestName: string;
    },
  ) {
    const { contestInstanceId, forcedCancel, contestName } = body;
    try {
      const { fixtureName } =
        await this.contestInstanceService.getFixtureNameByContestId(contestId);
      const isSuccess = await this.cancelContestInstanceService.cancelContest(
        {
          contestId,
          instanceId: contestInstanceId,
        },
        forcedCancel,
        fixtureName,
      );
      if (!isSuccess) {
        return { success: false };
      }
      await this.contestInstanceParticipantService.notifyUsersContestWasCanceledByAdmin(
        contestInstanceId,
        contestName,
        contestId,
      );
    } catch (err) {
      this.logger.error(`${err.message}`, err.stack);
      throw err;
    }
    return { success: true };
  }

  @ApiOkResponse({
    type: WrappedPostFixtureCreateContestsBulkResponseDto,
    description: 'Success',
  })
  @ApiBadRequestResponse({
    schema: {
      anyOf: [
        {
          example: new BadRequestExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
          ).getResponse(),
        },
        {
          example: new BadRequestExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE,
          ).getResponse(),
        },
        {
          example: new BadRequestExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.INVALID_CONTEST_TEMPLATE_IDS_PASSED,
          ).getResponse(),
        },
      ],
    },
    description: 'Errors',
  })
  @HttpCode(200)
  @Post('/:fixtureId/create-contests-bulk')
  async postFixtureCreateContestsBulk(
    @Param('fixtureId') fixtureId: string,
    @Body() body: PostFixtureCreateContestsBulkRequestDto,
  ): Promise<PostFixtureCreateContestsBulkResponseDto> {
    const { cmsContestTemplateIds } = body;
    const parsedContestTemplateIds =
      this.fixtureService.parseContestTemplateIds(cmsContestTemplateIds);
    const fixture = await this.fixtureService.getFixtureDetailsById(fixtureId);

    if (!fixture) {
      throw new BadRequestExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
      );
    }
    if (!fixture.isComplete) {
      throw new BadRequestExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE,
      );
    }
    const notCreatedContests: Array<string> = [];
    await Promise.all(
      parsedContestTemplateIds.map(async (cmsContestTemplateId: string) => {
        const { contestTemplate, originalData } =
          await this.cmsService.getContestTemplateByCmsId(
            Number(cmsContestTemplateId),
          );
        const { registrationStartTime, registrationStartPeriod } =
          contestTemplate.registrationTime;
        if (registrationStartTime) {
          const fixtureStartTime = fixture.startTime;
          const contestCreationTime = subMinutes(
            fixtureStartTime,
            registrationStartTime,
          );
          const currentTime = Date.now();

          const isBeforeFixtureStart =
            isBefore(currentTime, fixtureStartTime) &&
            fixture.fixtureStatusId === FixtureStatusId.PENDING;

          if (isBeforeFixtureStart) {
            const isBeforeContestCreation = isBefore(
              currentTime,
              contestCreationTime,
            );

            if (isBeforeContestCreation) {
              await this.contestService.createContestWithStartTime(
                contestTemplate,
                originalData,
                fixture,
              );
            } else {
              await this.contestService.createContestWithInstance(
                contestTemplate,
                originalData,
                fixture,
              );
            }
          } else {
            notCreatedContests.push(cmsContestTemplateId);
          }
        } else if (registrationStartPeriod) {
          if (registrationStartPeriod.periodId === fixture.currentPeriodId) {
            await this.contestService.createContestWithInstance(
              contestTemplate,
              originalData,
              fixture,
            );
          } else {
            notCreatedContests.push(cmsContestTemplateId);
          }
        } else {
          notCreatedContests.push(cmsContestTemplateId);
        }
      }),
    );
    return { success: true, notCreatedContests };
  }
  @Post('/:fixtureId/process')
  async performAction(
    @Body('operationType') operationType: string,
    @Param('fixtureId') fixtureId: string,
  ) {
    try {
      await this.fixtureService.performAction(operationType, fixtureId);
      return { success: true };
    } catch (err) {
      throw err;
    }
  }

  @ApiOkResponse({
    type: WrappedPostFixtureStartFreeBetsResponseDto,
    description: 'Success',
  })
  @ApiBadRequestResponse({
    schema: {
      anyOf: [
        {
          example: new BadRequestExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
          ).getResponse(),
        },
        {
          example: new BadRequestExceptionCustom(
            ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE,
          ).getResponse(),
        },
      ],
    },
    description: 'Errors',
  })
  @HttpCode(200)
  @Post('/:fixtureId/start-free-bets')
  async fixtureStartFreeBet(
    @Param('fixtureId') fixtureId: string,
    @Body() body: PostFixtureStartFreeBetsDto,
  ): Promise<PostFixtureStartFreeBetsResponseDto> {
    const fixture = await this.fixtureService.getFixtureDetailsById(fixtureId);
    if (!fixture) {
      throw new BadRequestExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND,
      );
    }
    if (!fixture.isComplete) {
      throw new BadRequestExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_COMPLETE,
      );
    }
    await this.contestService.runCustomFreeBet(fixture.fixtureId, body);
    return { success: true };
  }

  @HttpCode(200)
  @Post('/lock-odds')
  async lockOddsChange(
    @Body() body: PostLockOddsChangeDto,
  ): Promise<PostLockOddsChangeResponseDto> {
    await this.contestService.disableLockOddsForForceBets(body);
    return { success: true };
  }

  @Get('/contests/:contestId/dynamic-link')
  async getDynamicLink(@Param('contestId') contestId: string) {
    try {
      const result = await this.contestService.getDynamicLink(contestId);
      return result;
    } catch (err) {
      this.logger.error(
        `error during creating some link: ${err.message}`,
        err.stack,
      );
      throw err;
    }
  }
  @Get('/instances/:instanceId/participants/:participantId/view-bets')
  async viewBets(
    @Query()
    queryParams: {
      page: string;
      size: string;
      orderBy: string;
      direction: string;
    },
    @Param() params: { instanceId: string; participantId: string },
  ) {
    const { page, size, orderBy, direction } = queryParams;
    const { instanceId, participantId } = params;
    const result =
      await this.contestInstanceParticipantService.viewParticipantBets(
        instanceId,
        participantId,
        page,
        size,
        orderBy,
        direction,
      );
    return result;
  }
}
