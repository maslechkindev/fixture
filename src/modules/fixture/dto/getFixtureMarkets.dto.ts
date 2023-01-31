import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { FixtureMarketDto } from './fixtureMarket.dto';
import { PostFixtureStartFreeBetsDto } from './postFixtureStatFreeBets.dto';
import { MarketLine } from '../../../interfaces/db/tables';

enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetFixtureMarketsRequestDto {
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

  @ApiProperty({ example: 'a1d5ea45-edbf-4409-a313-6ca223cf4718' })
  @IsOptional()
  marketLines?: string;
}

export class GetFixtureMarketsResponseDto {
  @ApiProperty({
    example: {
      id: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
      name: 'First To 55 Points, 2nd Half (Ordinary Time)',
      status: true,
      order: 0,
    },
  })
  markets: Array<FixtureMarketDto>;

  @ApiProperty({
    example: 1,
  })
  count: number;

  @ApiProperty()
  cmsInfo: PostFixtureStartFreeBetsDto;

  @ApiProperty()
  marketLines: Array<Partial<MarketLine>>;
}

export class WrappedGetFixtureMarketsResponseDto {
  @ApiProperty()
  data: GetFixtureMarketsResponseDto;
}
