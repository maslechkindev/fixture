import { ApiProperty } from '@nestjs/swagger';

export class WrappedGetFixtureCustomContestIdsResponseDto {
  @ApiProperty()
  data: string[];
}
