import { ApiProperty } from '@nestjs/swagger';

export class PostFixtureCreateContestsBulkRequestDto {
  @ApiProperty({
    example: 'fixture id field',
  })
  id: string;
  @ApiProperty({
    example: '[cmsContestTemplateId, cmsContestTemplateId2]',
  })
  cmsContestTemplateIds: string;
}

export class PostFixtureCreateContestsBulkResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  notCreatedContests: string[];
}

export class WrappedPostFixtureCreateContestsBulkResponseDto {
  @ApiProperty()
  data: PostFixtureCreateContestsBulkResponseDto;
}
