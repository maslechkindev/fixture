import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Contest, Fixture, Market } from 'interfaces/db/tables';

export class UpdateFixtureDto {
  @ApiProperty({
    example: {
      id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
      name: 'username',
      display: true,
    },
  })
  @IsNotEmpty()
  fixture: Partial<Fixture>;
  @ApiProperty()
  markets: Array<Partial<Market>>;
  @ApiProperty()
  contests: Array<Partial<Contest>>;
  @ApiProperty()
  marketLines: Array<{
    marketLineId: string;
    status: string;
    marketId: string;
  }>;
}

export class UpdateFixtureResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;
}

export class WrappedUpdateFixtureResponseDto {
  @ApiProperty()
  data: UpdateFixtureResponseDto;
}
