import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FixtureDto } from './fixture.dto';

enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetFixturesRequestDto {
  @ApiProperty({ isArray: true, example: [1, 2, 3] })
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  statuses: number[];

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

  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  orderBy: string;

  @ApiProperty({ example: 'string' })
  search: string;
}

export class GetFixturesDto {
  @ApiProperty({
    example: [
      {
        id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
        name: 'fixture',
        competition: 'competition',
        startTime: 'start time',
        state: 'state',
        currentPeriod: new Date('01/01/2021'),
        active: true,
      },
    ],
  })
  fixtures: Array<Partial<FixtureDto>>;

  @ApiProperty({
    example: 1,
  })
  count: number;
}

export class WrappedGetFixturesResponse {
  @ApiProperty({ type: GetFixturesDto, isArray: true })
  data: GetFixturesDto[];
}
