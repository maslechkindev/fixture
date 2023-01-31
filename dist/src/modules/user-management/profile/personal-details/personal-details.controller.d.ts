import { PersonalDetailsService } from './personal-details.service';
import { ChangeUsernameService } from 'modules/user-management/profile/change-username/change-username.service';
import { User as UserType } from 'interfaces/user.interface';
import { PersonalDetailsDto, PersonalDetailsInfoResponse } from './dto/personalDetails.dto';
import { PersonalDetailsEditableFieldsResponse } from './dto/personalDetailsEditableFields.dto';
import { GetUsernameByUserIdDto, GetUsernameByUserIdDtoResponse } from './dto/getUsernameByUserId.dto';
import { getUserFollowersInfoRequestDto } from './dto/getFollowersInfo.dto';
import { GetReferrerUsernameDtoRequest, GetReferrerUsernameDtoResponse } from './dto/getReferrerUsername.dto';
export declare class PersonalDetailsController {
    private readonly personalDetailsService;
    private readonly changeUsernameService;
    constructor(personalDetailsService: PersonalDetailsService, changeUsernameService: ChangeUsernameService);
    private logger;
    getUserInfo(user: UserType): Promise<PersonalDetailsInfoResponse>;
    getFollowersListInfo(userData: Pick<UserType, 'id'>, queryInfo: getUserFollowersInfoRequestDto): Promise<any[]>;
    getReferrerUsername(queryData: GetReferrerUsernameDtoRequest): Promise<GetReferrerUsernameDtoResponse>;
    getUsernameByUserId(params: GetUsernameByUserIdDto): Promise<GetUsernameByUserIdDtoResponse>;
    getUserPersonalDetailsEditableFields(user: UserType): Promise<PersonalDetailsEditableFieldsResponse>;
    changePersonalDetails(user: UserType, body: PersonalDetailsDto): Promise<{
        success: boolean;
    }>;
}
