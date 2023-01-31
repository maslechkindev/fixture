import { ApiProperty } from '@nestjs/swagger';
import { Fixture } from 'interfaces/db/tables';
import { MarketSuspensionRule } from 'enums/marketSuspensionRule';

export class GetFixtureResponseDto {
  @ApiProperty({
    example: {
      id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
      name: 'Portland Trail Blazers vs New York Knicksssss',
      sportId: '5',
      startTime: '2022-04-17 17:00:00.000',
      endTime: '2022-04-17 18:00:00.000',
      isLive: true,
      competitionId: '145083608899571712',
      competition: 'NFL',
      sport: 'Am. Football',
      display: true,
      delay: 5,
      marketSuspensionRules: MarketSuspensionRule.DO_NOT_SUSPEND,
      templateId: '54',
      currentPeriodId: '31',
    },
  })
  fixture: Partial<Fixture> & {
    competition: string;
    sport: string;
    templateId: string;
  };
}

export class WrappedGetFixtureResponseDto {
  @ApiProperty()
  data: GetFixtureResponseDto;
}
