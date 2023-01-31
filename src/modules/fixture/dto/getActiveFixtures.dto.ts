import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumberString,
  IsString,
  Min,
  IsNotEmpty,
  Max,
  IsEnum,
  IsArray,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateStringArray', async: false })
export class CustomQueryParametersCalidator
  implements ValidatorConstraintInterface
{
  validate(value: string | string[]) {
    return typeof value === 'string' || Array.isArray(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `Parameter ${args.property} must be a string or an array of strings`;
  }
}

import { Type, Transform } from 'class-transformer';

enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ActiveFixtureDto {
  @ApiProperty()
  fixtureId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isLive: boolean;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  currentPeriodId: string;

  @ApiProperty()
  currentPeriodName: string;

  @ApiProperty()
  competitionId: string;

  @ApiProperty()
  competitionName: string;

  @ApiProperty()
  sportIcon: string;

  @ApiProperty()
  competitionIdCMS: string;
}

export class GetActiveFixturesRequestDto {
  @ApiPropertyOptional({ example: '54' })
  @IsNumberString()
  @IsOptional()
  competitionTemplateId: string;

  @ApiProperty({ example: 1 })
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '54' })
  fixtureId: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Validate(CustomQueryParametersCalidator)
  @Transform(({ value }) => {
    return typeof value === 'string' ? [value] : value;
  })
  contestTypes: string[];

  realMoneyState?: boolean;

  @ApiProperty({ example: 'string' })
  search: string;
}

export class WrappedGetActiveFixturesResponse {
  @ApiProperty({ type: ActiveFixtureDto, isArray: true })
  data: ActiveFixtureDto[];
}
