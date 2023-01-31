import { ApiProperty } from '@nestjs/swagger';
import { Contest } from 'interfaces/db/tables';

export class GetFixtureContestResponseDto {
  @ApiProperty({
    example: {
      id: 'cc67bf00-033c-4599-8700-e96276fd3918',
      contestName: 'NBA real money name',
      minParticipants: 10,
      maxParticipants: 100,
      bankrollAmount: 25000,
      fixtureId: '161346125478023403',
      fixtureName: 'Portland Trail Blazers vs New York Knicks2',
      productType: 'real_money',
      notFinished: 3,
    },
  })
  contest: Partial<Contest> & {
    fixtureName: string;
    productType: string;
    notFinished: number;
  };
}

export class WrappedGetFixtureContestResponseDto {
  @ApiProperty()
  data: GetFixtureContestResponseDto;
}
