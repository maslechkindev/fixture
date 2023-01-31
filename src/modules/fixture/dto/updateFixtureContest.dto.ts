import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

export class UpdateFixtureContestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fixtureId: string;

  @ApiProperty()
  contestName: string;

  @ApiProperty()
  @Transform(({ value }) => value || undefined)
  contestOwnerResourceLink: string;

  @ApiProperty()
  @Transform(({ value }) => value || undefined)
  contestOwnerLabelName: string;

  @ApiProperty()
  streamLive: boolean;
}
