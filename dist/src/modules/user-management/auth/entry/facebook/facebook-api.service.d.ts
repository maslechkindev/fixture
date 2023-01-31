import { HttpService } from '@nestjs/axios';
import { DebugTokenResponseDTO } from './dto/debugTokenResponse.dto';
import { UserInfoResponseDTO } from './dto/userInfoResponse.dto';
export declare class FacebookAPIService {
    private httpService;
    constructor(httpService: HttpService);
    validateAccessToken(access_token: string): Promise<DebugTokenResponseDTO>;
    getUserInfoWithToken(access_token: string): Promise<UserInfoResponseDTO>;
}
