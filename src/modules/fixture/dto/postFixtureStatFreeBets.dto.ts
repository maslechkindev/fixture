import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  Min,
  IsNotEmpty,
  Max,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class PostFixtureStartFreeBetsDto {
  @ApiProperty({
    example: 'free bet title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'free bet info',
  })
  @IsNotEmpty()
  info: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(30)
  @IsNotEmpty()
  durationMin: number;

  @ApiProperty({
    example: 300,
  })
  @IsNumber()
  @Min(1)
  @Max(99999)
  @IsNotEmpty()
  betLimit: number;

  @ApiProperty({
    example: 300,
  })
  @IsNumber()
  @Min(1)
  @Max(60)
  @IsNotEmpty()
  notifyInSec: number;

  @ApiProperty()
  @IsBoolean()
  lockOdds: boolean;

  @ApiProperty({
    example: ['b59f3d44-b985-42b3-85be-2f29440ca084'],
  })
  @IsArray()
  markets: Array<string>;
}

export class PostFixtureStartFreeBetsResponseDto {
  @ApiProperty()
  success: boolean;
}

export class WrappedPostFixtureStartFreeBetsResponseDto {
  @ApiProperty()
  data: PostFixtureStartFreeBetsResponseDto;
}
