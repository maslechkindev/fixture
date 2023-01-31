import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, Max, Min } from 'class-validator';
import { FixtureContestDto } from './fixtureContest.dto';

enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetFixtureContestsRequestDto {
  @ApiProperty({ example: 1 })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @Min(10)
  @Max(100)
  @Type(() => Number)
  size: number;

  @ApiProperty({ enum: Direction })
  @IsEnum(Direction)
  @IsNotEmpty()
  direction: string;

  @ApiProperty({ example: 'createdAt' })
  @IsNotEmpty()
  orderBy: string;

  @ApiProperty({ example: 'string' })
  search: string;
}
export type GetContestInstancesByContest = GetFixtureContestsRequestDto & {
  contestId: string;
  page?: number;
  size?: number;
};

export class GetFixtureContestsResponseDto {
  @ApiProperty({
    example: {
      id: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
      contestName: 'NFL contest',
      type: 'Default',
      createdAt: '2022-03-31T07:51:49.983Z',
      period: 'Whole Match',
      instancesNumber: '3',
    },
  })
  contests: Array<FixtureContestDto>;

  @ApiProperty({
    example: 1,
  })
  count: number;
}

export class WrappedGetFixtureContestsResponseDto {
  @ApiProperty()
  data: GetFixtureContestsResponseDto;
}
