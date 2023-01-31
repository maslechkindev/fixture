import { User as UserType } from 'interfaces/user.interface';
import { TokensService } from './tokens.service';
import { AddFcmTokenDto, AddFcmTokenResponseDto } from './dto/addFcmToken.dto';
import { UpdateFcmTokenDto, UpdateFcmTokenResponseDto } from './dto/updateFcmToken.dto';
import { RemoveFcmTokenDto, RemoveFcmTokenResponseDto } from './dto/removeFcmToken.dto';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    add(user: UserType, body: AddFcmTokenDto): Promise<AddFcmTokenResponseDto>;
    update(user: UserType, body: UpdateFcmTokenDto): Promise<UpdateFcmTokenResponseDto>;
    remove(user: UserType, body: RemoveFcmTokenDto): Promise<RemoveFcmTokenResponseDto>;
}
