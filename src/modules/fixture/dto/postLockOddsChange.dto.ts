import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class LockOdds {
  @ApiProperty({
    example: '6',
  })
  @IsNotEmpty()
  @IsString()
  contestTemplate?: number;

  @ApiProperty({
    example: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
  })
  @IsNotEmpty()
  @IsString()
  fixtureId?: string;

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  lockOdds: boolean;
}

export class PostLockOddsChangeDto {
  @IsArray()
  @Type(() => LockOdds)
  lockOdds: Array<LockOdds>;
}

export class PostLockOddsChangeResponseDto {
  @ApiProperty()
  success: boolean;
}

export class WrappedPostFixtureStartFreeBetsResponseDto {
  @ApiProperty()
  data: PostLockOddsChangeResponseDto;
}
